import BreadcrumbsSection from "@components/BreadcrumbsSection";
import ContentCard from "@components/cards/ContentCard";
import SearchFilterBar from "@components/SearchFilterBar";
import { CONTENT_SORT_ITEMS } from "@constants/";
import { CONTENT_SORT_VALUES } from "@constants";
import commonProps from "@hoc/commonProps";
import { Box, Container, Grid, Stack } from "@mui/material";
import clientPromise from "lib/db/connect";
import { getContent } from "lib/db/content";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";

const ContentPage = ({ content, tags }) => {
  const [cards, setCards] = useState(content);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilters, setSearchFilters] = useState([]);

  const { t } = useTranslation("content");

  const search = (q) => {
    return cards.filter((c) => {
      return Object.values(c)
        .map((f) => {
          if (typeof f === "string") {
            return f.includes(q);
          } else {
            return false;
          }
        })
        .includes(true);
    });
  };

  const handleSearch = (q, f) => {
    setSearchQuery(q);
    setSearchFilters(f);
    if (q) {
      const result = search(searchQuery);
      console.log("result", result);
      setCards(result);
    } else {
      setCards(content);
    }
  };

  const handleSort = (order) => {
    const protocol = CONTENT_SORT_VALUES[order];
    const stuff = cards.sort((a, b) => {
      switch (protocol.category) {
        case "likes":
          return a.likes.length - b.likes.length;
        case "duration":
          if (protocol["value"] === 1) {
            return parseInt(a.duration) - parseInt(b.duration);
          } else {
            return parseInt(b.duration) - parseInt(a.duration);
          }
        case "views":
          return a.views - b.views;
        default:
          if (protocol["value"] === 1) {
            if (a[protocol.category] > b[protocol.category]) {
              return 1;
            }
            return -1;
          } else {
            if (a[protocol.category] < b[protocol.category]) {
              return 1;
            }
            return -1;
          }
      }
    });
    setCards(stuff);
  };

  useEffect(() => {}, [cards]);
  return (
    <Container sx={{ pt: 6, pb: 10 }} maxWidth="xl">
      <Stack justifyContent="center" alignItems="center" spacing={3}>
        {/* Breadcrumbs */}
        <BreadcrumbsSection
          title={t("content")}
          subtitle={t("content_caption")}
          sx={{ mb: 3 }}
        />
        {/* Search */}
        <SearchFilterBar
          tags={tags}
          parentCallback={handleSearch}
          withSort
          sortItems={CONTENT_SORT_ITEMS}
          sortCallback={handleSort}
          translateCategories
          dontTranslateSubCategoriesOf={["author_id"]}
          inputPlaceholder={t("search_bar")}
        />
        {/* Content */}
        <Box sx={{ width: "100%" }}>
          <Grid
            container
            sx={{ pb: 2 }}
            justifyContent="center"
            alignItems="center"
            spacing={4}
          >
            {/* Cards */}
            {cards.length > 0
              ? cards.map((item, i) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                    <ContentCard {...item} />
                  </Grid>
                ))
              : content.map((item, i) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                    <ContentCard {...item} />
                  </Grid>
                ))}
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
