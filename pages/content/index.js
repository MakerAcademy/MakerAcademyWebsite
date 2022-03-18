import BreadcrumbsSection from "@components/BreadcrumbsSection";
import ContentCard from "@components/cards/ContentCard";
import SearchFilterBar from "@components/SearchFilterBar";
import { CONTENT_SORT_ITEMS } from "@constants/";
import commonProps from "@hoc/commonProps";
import { Box, Container, Grid, Stack } from "@mui/material";
import clientPromise from "lib/db/connect";
import { getContent } from "lib/db/content";
import _ from "lodash";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";

const searchData = (data, term) => {
  const searchedArr = data.filter((item) => {
    const _find = `${item.title}
    ${item.topic}
    ${item.subtopic}
    ${item.level}
    ${item.username}
    ${item.description}`.toLowerCase();

    const searchArr = term.toLowerCase().split(" ");

    return searchArr.every((v) => _find.includes(v));
  });

  return searchedArr;
};

const sortData = (data, type) => {
  let newData = [...data];

  switch (type) {
    case "oldest":
      return _.orderBy(newData, ["timestamp"], ["asc"]);

    case "newest":
      return _.orderBy(newData, ["timestamp"], ["desc"]);

    case "likes":
      return _.orderBy(newData, ["likes"], ["desc"]);

    case "viewed":
      return _.orderBy(newData, ["views"], ["desc"]);

    case "highest_reading_time":
      return _.orderBy(newData, ["duration"], ["desc"]);

    case "lowest_reading_time":
      return _.orderBy(newData, ["duration"], ["asc"]);

    default:
      return _.orderBy(newData, ["timestamp"], ["desc"]);
  }
};

const filterData = (data, filters) => {
  const result = Object.keys(filters).reduce(
    (acc, key) => {
      const val = filters[key];

      acc = acc.filter((i) => val.includes(i[key]));

      return acc;
    },
    [...data]
  );

  return result;
};

const ContentPage = ({ content, tags, hideHeader }) => {
  const initialContent = sortData(content, "newest");
  const [data, setData] = useState(initialContent);
  const [filteredData, setFilteredData] = useState(initialContent);

  const { t } = useTranslation("content");

  const handleSearch = (term) => {
    const searched = searchData(filteredData, term);
    setFilteredData(searched);
  };

  const handleAll = (term, sortType, filters) => {
    let newData = data;

    if (filters) {
      newData = filterData(newData, filters);
    }

    if (term) {
      newData = searchData(newData, term);
    }

    if (sortType) {
      newData = sortData(newData, sortType);
    }

    setFilteredData(newData);
  };

  return (
    <Container sx={{ pt: 6, pb: 10 }} maxWidth="xl">
      <Stack justifyContent="center" alignItems="center" spacing={3}>
        {/* Breadcrumbs */}
        {!hideHeader && (
          <BreadcrumbsSection
            title={t("content")}
            subtitle={t("content_caption")}
            sx={{ mb: 3 }}
          />
        )}
        {/* Search */}
        <SearchFilterBar
          tags={tags}
          searchCallback={handleSearch}
          // filtersCallback={handleFilter}
          withSort
          sortItems={CONTENT_SORT_ITEMS}
          // sortCallback={handleSort}
          translateCategories
          dontTranslateSubCategoriesOf={["ALL"]}
          inputPlaceholder={t("search_bar")}
          changeCallback={handleAll}
        />

        {/* Content */}
        <Box sx={{ width: "100%" }}>
          <Grid
            container
            sx={{ pb: 2 }}
            // justifyContent="center"
            alignItems="center"
            spacing={4}
          >
            {/* Cards */}
            {filteredData.map((item, i) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                <ContentCard {...item} />
              </Grid>
            ))}
            {/* {filteredData.length > 0
              ? filteredData.map((item, i) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                    <ContentCard {...item} />
                  </Grid>
                ))
              : content.map((item, i) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                    <ContentCard {...item} />
                  </Grid>
                ))} */}
          </Grid>
        </Box>
      </Stack>
    </Container>
  );
};

export async function getServerSideProps(context) {
  const client = await clientPromise;
  const db = client.db();
  const data = await getContent(db);
  return {
    props: {
      content: data[0],
      tags: data[1],
    },
  };
}

export default commonProps(ContentPage, {
  basic: true,
  translation: "content",
});
