import BreadcrumbsSection from "@components/BreadcrumbsSection";
import RoundedButton from "@components/buttons/RoundedButton";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { Box, Container, Stack, Typography } from "@mui/material";
import clientPromise from "lib/db/connect";
import { getContent } from "lib/db/content";
import React from "react";
import ContentPage from "../content";

const Section = ({ title, description }) => (
  <Box sx={{ mb: { xs: 3, md: 5 } }}>
    <Typography
      variant="h6"
      sx={{ textDecoration: "underline", fontWeight: 400, mb: 1 }}
    >
      {title}
    </Typography>

    <Typography>{description}</Typography>
  </Box>
);

const ExpertOverviewPage = ({ content, tags }) => {
  return (
    <Container sx={{ py: 7 }} maxWidth="xl">
      <BreadcrumbsSection
        title="Expert Overview"
        withDivider
        MiddleComponent={
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 4 }}>
            <Typography>
              Don't like reading? Watch this video instead
            </Typography>
            <RoundedButton
              variant="white"
              size="small"
              icon={<PlayCircleOutlineIcon fontSize="small" />}
            >
              Play
            </RoundedButton>
          </Stack>
        }
        sx={{ mb: { xs: 4, md: 6 } }}
      />

      <Section
        title="Maker Summary"
        description="Maker is a financial service created for the Ethereum Blockchain in 2015. Specifically, it is a lending service that takes crypto and RWA as collateral, and provides a unique asset in return. This unique asset, called DAI, is a cryptocurrency made by Maker that is ensured to be pegged to the USD. Maker, backed by people who believed in the power of blockchain’s ability to host currency, wanted to combat volatility in what they believed to be the best way."
      />

      <Section
        title="MakerDAO Summary"
        description="MakerDAO is the organization that governs Maker. It uses a novel business structure, called a DAO. They are a DAO to take advantage of blockchain's decentralization."
      />

      <Section
        title="Getting Started"
        description="To get started learning, we recommend following our beginner program to the right. This program is meant to take users from absolute novice to intermediate when it comes to understanding Maker."
      />

      <Typography>
        You can also just check out some of our other beginner content down
        below. To find more beginner content, go to our content tab and filter
        by beginner.
      </Typography>

      <ContentPage
        content={content}
        tags={tags}
        hideHeader
        filterProps={{
          hideFilterMenu: true,
          defaultFilters: {
            level: ["expert"],
          },
        }}
      />
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

export default ExpertOverviewPage;
