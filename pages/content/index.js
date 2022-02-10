import BreadcrumbsSection from "@components/BreadcrumbsSection";
import RoundedButton from "@components/buttons/RoundedButton";
import ContentCard from "@components/cards/ContentCard";
import SearchFilterBar from "@components/SearchFilterBar";
import { Box, Container, Grid, Stack } from "@mui/material";
import React from "react";

const ContentPage = (props) => {
  const { content = [] } = props;

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
        <Grid container sx={{ width: "100%", pb: 2 }}>
          {content.map((item, i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              <Box sx={{ p: 2 }}>
                <ContentCard {...item} />
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Load more */}
        <RoundedButton>Load More</RoundedButton>
      </Stack>
    </Container>
  );
};

export async function getServerSideProps(context) {
  // Add fetch to utils or api once backend complete
  const data = [
    ...Array(12)
      .fill()
      .map((_, i) => ({
        _id: i,
        image:
          "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.png",
        title: "Lorem Ipsum is simply dummy text",
        subtitle:
          "This will teach you what a DAO is and why Maker protocol is governed by a DAO instead of a corporation.",
        tags: ["abc", "xyz"],
        timestamp: "Jan 27 2020",
        level: "beginner",
        duration: 8,
        content_type: i % 2 === 0 ? "document" : "course",
      })),
  ];

  return {
    props: { content: data },
  };
}

export default ContentPage;
