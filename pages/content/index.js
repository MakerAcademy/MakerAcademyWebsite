import BreadcrumbsSection from "@components/BreadcrumbsSection";
import RoundedButton from "@components/buttons/RoundedButton";
import ContentCard from "@components/cards/ContentCard";
import SearchFilterBar from "@components/SearchFilterBar";
import { Box, Container, Divider, Grid, Stack } from "@mui/material";
import { connectToDB } from "db/connect";
import { getContent, getContentSearchTags, getCountEstimate } from "db/content";
import React, { useCallback, useEffect, useState } from "react";
import {TAGS} from "src/constants/tags";

const ContentPage = ({ limit, content, tags }) => {
  const [cards, setCards] = useState(content);
  const [searchQuery, setSearchQuery ] = useState("");
  const [searchFilters, setSearchFilters] = useState([])


  const handleCallback = (q, f) => {
    setSearchQuery(q);
    setSearchFilters(f);
  }

  useEffect(() => {
    fetchFreshDocs(searchFilters, null).then(() => {
      console.log('fetched ', cards.length, ' cards');
    })
  }, [searchQuery, searchFilters])

  const fetchFreshDocs = async (filters, lastItemTime) => {
    const response = fetch('api/content', {
      method: "POST",
      headers: {
          "Content-Type": 'application/json',
      },
      body: JSON.stringify({
        filters: filters,
        lastItemTime: lastItemTime
      })
    }).then((response) => response.json())
      .then((body) => {
        setCards(body.message)
      });
  }

  return (
    <Container sx={{ pt: 6, pb: 10 }} maxWidth="xl">
      <Stack justifyContent="center" alignItems="center" spacing={3}>
        {/* Breadcrumbs */}
        <BreadcrumbsSection
          title="Content"
          subtitle="This page hosts all of Maker Academy's educational content, ranging from articles to videos to entire courses. To aid your search for content, consider using our filters and search bar below!"
          sx={{ mb: 3 }}
        />

        {/* Search */}
        <SearchFilterBar tags={tags} parentCallback={handleCallback}/>

        {/* Content */}
        <Grid container sx={{ width: "100%", pb: 2 }}>
          {cards.length > 0 ? (cards.map((item, i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              <Box sx={{ p: 2 }}>
                <ContentCard {...item} />
              </Box>
            </Grid>
          ))) : (content.map((item, i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              <Box sx={{ p: 2 }}>
                <ContentCard {...item} />
              </Box>
            </Grid>
          )))}
        </Grid>

        {/* Load more */}
        { (limit > content.length) ? (<RoundedButton onClick={handleLoadMore}>Load More</RoundedButton>) :
          (<></>)}

      </Stack>
    </Container>
  );
};

export async function getServerSideProps(context) {
  const {db} = await connectToDB();
  const docs = await getContent(db, {},  null);
  const tags = await getContentSearchTags(db, TAGS);
  const count = await getCountEstimate(db, 'content');

  return {
    props: {
      content: docs,
      tags: tags,
      limit: count,
    },
  };
}

export default ContentPage;
