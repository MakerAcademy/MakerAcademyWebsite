import BreadcrumbsSection from "@components/BreadcrumbsSection";
import RoundedButton from "@components/buttons/RoundedButton";
import ProgramsCoursesCarousel from "@components/carousels/ProgramsCoursesCarousel";
import ResponsiveText from "@components/ResponsiveText";
import SearchFilterBar from "@components/SearchFilterBar";
import {
  Box,
  Container,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { DUMMY_FILTER_OPTIONS } from "@components/SearchFilterBar/dummyData";
import { connectToDB } from "../../lib/db/connect";
import { getCountEstimate, getPrograms, getProgramSearchTags } from "../../lib/db/program";
import { TAGS } from "@constants/tags";

const ProgramsPage = ({ programs, tags, count }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const ProgramContainer = ({ _id, title, subtitle, children }) => (
    <Paper
      elevation={isDark ? 2 : 0}
      sx={{
        p: 3,
        borderRadius: "10px",
        boxShadow:
          !isDark &&
          "rgba(0, 0, 0, 0.16) 0px 6px 16px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Box sx={{ maxWidth: 700 }}>
          <ResponsiveText variant="h5" sx={{ mb: 1.5 }}>
            {title}
          </ResponsiveText>
          <Typography>{subtitle}</Typography>
        </Box>

        <Link href={`/programs/${_id}`}>
          <RoundedButton
            variant="outlined"
            sx={{ height: 40, px: 2, minWidth: 115 }}
          >
            View More
          </RoundedButton>
        </Link>
      </Stack>

      <Box sx={{ py: 2 }}>{children}</Box>
    </Paper>
  );

  return (
    <Container sx={{ py: 8 }} maxWidth="xl">
      <Stack justifyContent="center" alignItems="center" spacing={3}>
        {/* Breadcrumbs */}
        <BreadcrumbsSection
          title="Programs"
          subtitle="If you have a specific goal in mind with your education, please check out some of our programs! These programs are sequential orderings of different pieces of content that build upon each other, culminating in a mastery of a specific goal."
          sx={{ mb: 3 }}
        />

        {/* Search */}
        <SearchFilterBar tags={tags}/>

        {/* Content */}
        <Stack sx={{ width: "100%", py: 2 }} spacing={{ xs: 2, md: 4 }}>
          {programs.map((program, i) => (
            <Box key={i}>
              <ProgramContainer
                _id={program._id}
                title={program.title}
                subtitle={program.subtitle}
              >
                <ProgramsCoursesCarousel
                  courses={program.courses}
                  _programId={program._id}
                />
              </ProgramContainer>
            </Box>
          ))}
        </Stack>

        {/* Load more */}
        { (count > programs.length) && (<RoundedButton>Load More</RoundedButton>)}
      </Stack>
    </Container>
  );
};

export async function getServerSideProps(context) {
  // Add fetch to utils or api once backend complete
  const {db} = await connectToDB();
  const programs = await getPrograms(db, {}, null);
  const tags = await getProgramSearchTags(db, TAGS);
  const count = await getCountEstimate(db, 'programs');

  return {
    props: {
      programs: programs,
      tags: tags,
      count: count
    },
  };
}

export default ProgramsPage;
