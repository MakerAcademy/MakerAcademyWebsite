import BreadcrumbsSection from "@components/BreadcrumbsSection";
import RoundedButton from "@components/buttons/RoundedButton";
import ContentCard from "@components/cards/ContentCard";
import SearchFilterBar from "@components/SearchFilterBar";
import { Box, Container, Grid, Stack } from "@mui/material";
import { connectToDB } from "db/connect";
import { getContent, getContentSearchTags } from "db/content";
import React from "react";
import {TAGS} from "src/constants/tags";
import { nanoid } from "nanoid";

const ContentPage = (props) => {
  let { content = [] } = props;
  console.log('hi',content[0]._id);
  const tags = props.tags;

  const handleLoadMore = async () => {
    console.log(nanoid(21));
  }

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
        <SearchFilterBar tags={tags}/>

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
        <RoundedButton onClick={handleLoadMore}>Load More</RoundedButton>
      </Stack>
    </Container>
  );
};

export async function getServerSideProps(context) {
  const {db} = await connectToDB();
  const docs = await getContent(db, {}, null, null);
  const tags = await getContentSearchTags(db, TAGS);

  return {
    props: {
      content: docs,
      tags: tags,
      test: "HELLO",
    },
  };
}

export default ContentPage;
