import BreadcrumbsSection from "@components/BreadcrumbsSection";
import RoundedButton from "@components/buttons/RoundedButton";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { Box, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
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

const ContributorPathways = () => {
  return (
    <Container sx={{ py: 7 }}>
      <BreadcrumbsSection
        title="Contributor Pathways"
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
        title="How can you contribute to MakerDAO?"
        description="MakerDAO has many kinds of contributors, all the way from doing research under our grants program to being a full time contributor of a MakerDAO team. "
      />

      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
        spacing={2}
        sx={{ mb: { xs: 3, md: 5 } }}
      >
        <Link href={"/contribute/pipeline/bug-bounties"}>
          <RoundedButton variant="outlined">Bug Bounties</RoundedButton>
        </Link>

        <Link href={"/contribute/pipeline/grants"}>
          <RoundedButton variant="outlined">Grants</RoundedButton>
        </Link>

        <Link href={"/contribute/pipeline/core-unit-incubation"}>
          <RoundedButton variant="outlined">Core Unit Incubation</RoundedButton>
        </Link>
      </Stack>

      <Section
        title="Why contribute to MakerDAO?"
        description="Experience. Money. "
      />

      <Link href="/contribute">
        <RoundedButton>Start Contributing</RoundedButton>
      </Link>
    </Container>
  );
};

export default ContributorPathways;
