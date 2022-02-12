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
import { useRouter } from "next/router";
import React from "react";
import { DUMMY_FILTER_OPTIONS } from "@components/SearchFilterBar/dummyData";

const ProgramsPage = ({ programs = [] }) => {
  const theme = useTheme();

  const ProgramContainer = ({ _id, title, subtitle, children }) => (
    <Paper sx={{ p: 3, borderRadius: "10px" }}>
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
        {/* Breadcrumbds */}
        <BreadcrumbsSection
          title="Programs"
          subtitle="If you have a specific goal in mind with your education, please check out some of our programs! These programs are sequential orderings of different pieces of content that build upon each other, culminating in a mastery of a specific goal."
          sx={{ mb: 3 }}
        />

        {/* Search */}
        <SearchFilterBar tags={DUMMY_FILTER_OPTIONS}/>

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
        <RoundedButton>Load More</RoundedButton>
      </Stack>
    </Container>
  );
};

export async function getServerSideProps(context) {
  // Add fetch to utils or api once backend complete
  const data = [
    ...Array(5)
      .fill()
      .map((_, i) => ({
        _id: i,
        title: "Facilitator Onboarding Program",
        subtitle:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse placerat elit in nulla porttitor tempus. Donec suscipit velit sit amet purus cursus dictum. ",
        courses: [
          ...Array(12)
            .fill()
            .map((_, j) => ({
              _id: j,
              title: "Lorem Ipsum is simply dummy text",
              tags: ["Maker", "DeFi"],
              timestamp: "Jan 27 2020",
              level: "beginner",
              duration: 8,
              content_type: "course",
            })),
        ],
      })),
  ];

  return {
    props: { programs: data },
  };
}

export default ProgramsPage;
