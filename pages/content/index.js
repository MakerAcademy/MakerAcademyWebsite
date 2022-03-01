import BreadcrumbsSection from "@components/BreadcrumbsSection";
import ContentCard from "@components/cards/ContentCard";
import SearchFilterBar from "@components/SearchFilterBar";
import { CONTENT_SORT_ITEMS } from "@constants/";
import commonProps from "@hoc/commonProps";
import { Box, Container, Grid, Stack } from "@mui/material";
import { connectToDB } from "lib/db/connect";
import useTranslation from "next-translate/useTranslation";
import {
  getContent,
  getContentSearchTags,
  getCountEstimate,
} from "lib/db/content";
import React, { useState } from "react";
import { TAGS } from "src/constants/tags";

const ContentPage = ({ limit, content, tags }) => {
  const [cards, setCards] = useState(content);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilters, setSearchFilters] = useState([]);

  const { t } = useTranslation("content");

  const handleCallback = (q, f) => {
    setSearchQuery(q);
    setSearchFilters(f);
  };

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
          parentCallback={handleCallback}
          withSort
          sortItems={CONTENT_SORT_ITEMS}
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
  const { db } = await connectToDB();
  const docs = await getContent(db);
  const tags = await getContentSearchTags(db, TAGS);
  const count = await getCountEstimate(db, "content");
  return {
    props: {
      content: docs,
      tags: tags,
      limit: count,
    },
  };
}

export default commonProps(ContentPage, {
  basic: true,
  translation: "content",
});
