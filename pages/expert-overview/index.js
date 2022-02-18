import BreadcrumbsSection from "@components/BreadcrumbsSection";
import RoundedButton from "@components/buttons/RoundedButton";
import OverviewCarousel from "@components/carousels/OverviewCarousel";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import React from "react";

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

const ExpertOverviewPage = ({ content = [] }) => {
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

      <Stack sx={{ my: 5 }} spacing={3}>
        <Paper sx={{ p: 2 }}>
          <Typography sx={{ mb: 2, fontWeight: 600 }}>
            Beginner Content
          </Typography>
          <OverviewCarousel contents={content} />
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Typography sx={{ mb: 2, fontWeight: 600 }}>
            Intermediate Content
          </Typography>
          <OverviewCarousel contents={content} />
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Typography sx={{ mb: 2, fontWeight: 600 }}>
            Advanced Content
          </Typography>
          <OverviewCarousel contents={content} />
        </Paper>
      </Stack>
    </Container>
  );
};

export async function getServerSideProps(context) {
  // Add fetch to utils or api once backend complete
  const data = [
    ...Array(5)
      .fill()
      .map((o) => ({
        title: "Facilitator Onboarding Program",
        subtitle:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse placerat elit in nulla porttitor tempus. Donec suscipit velit sit amet purus cursus dictum. ",
        courses: [
          ...Array(12)
            .fill()
            .map((i) => ({
              title: "Lorem Ipsum is simply dummy text",
              tags: ["Maker", "DeFi"],
              timestamp: "Jan 27 2020",
              content_type: "beginner",
              duration: 8,
            })),
        ],
      })),
  ];

  return {
    props: { content: data },
  };
}

export default ExpertOverviewPage;
