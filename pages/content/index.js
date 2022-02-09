import BreadcrumbsSection from "@components/BreadcrumbsSection";
import ContentCard from "@components/cards/ContentCard";
import SearchFilterBar from "@components/SearchFilterBar";
import { Box, Container, Grid, Stack } from "@mui/material";
import { connectToDB } from "db/connect";
import { getContent } from "db/content";
import React from "react";

const ContentPage = (props) => {
  const { courses = [] } = props;

  return (
    <Container sx={{ pt: 6, pb: 10 }} maxWidth="xl">
      <Stack justifyContent="center" alignItems="center" spacing={3}>
        {/* Breadcrumbds */}
        <BreadcrumbsSection
          title="Content"
          subtitle="This page hosts all of Maker Academy's educational content, ranging from articles to courses to videos. To aid your search for content, consider using our filters and search bar below!"
          sx={{ mb: 3 }}
        />

        {/* Search */}
        <SearchFilterBar />

        {/* Content */}
        <Grid container sx={{ width: "100%" }}>
          {courses.map((item, i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              <Box sx={{ p: 2 }}>
                <ContentCard {...item} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
};

export async function getServerSideProps(context) {

  const {db} = await connectToDB();
  const docs = await getContent(db, {}, null, null);

  return {
    props: { courses: docs, test: "HELLO" },
  };
}

export default ContentPage;
