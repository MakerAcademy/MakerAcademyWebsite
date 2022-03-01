import BreadcrumbsSection from "@components/BreadcrumbsSection";
import RoundedButton from "@components/buttons/RoundedButton";
import ProgramsCoursesCarousel from "@components/carousels/ProgramsCoursesCarousel";
import ResponsiveText from "@components/ResponsiveText";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import clientPromise from "../../../lib/db/connect";
import { getOneProgram } from "../../../lib/db/program";

const Program = ({ program, title, likes = 0, views = 0 }) => {
  const { query } = useRouter();
  const { programId } = query;

  if (!program) {
    return (
      <Container maxWidth="xl" sx={{ py: 8 }}>
        Program Not Found
      </Container>
    );
  }

  const firstCourseId = program?.courses?.[0]?._id;

  const breadcrumbs = [
    { label: "Programs", href: "/programs" },
    { label: "Onboarding", href: "/programs" },
    { label: program.title, active: true },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <BreadcrumbsSection breadcrumbs={breadcrumbs} align="flex-start" />

      <Paper sx={{ p: 3, pb: { md: 6 }, mt: 4 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ pb: 1 }}
        >
          <ResponsiveText variant="h5">{title}</ResponsiveText>

          <RoundedButton
            variant="outlined"
            sx={{ height: 40 }}
            disabled={!firstCourseId}
            href={
              firstCourseId
                ? `/programs/${programId}/course/${firstCourseId}`
                : `#`
            }
          >
            Begin
          </RoundedButton>
        </Stack>

        {/* Likes and Views */}
        <Stack spacing={2} direction="row" sx={{ pb: 3 }}>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <VisibilityIcon sx={{ fontSize: 18 }} />
            <Typography variant="body2">Views: {views}</Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={0.5}>
            <FavoriteIcon sx={{ fontSize: 18 }} />
            <Typography variant="body2">Likes: {likes}</Typography>
          </Stack>
        </Stack>

        <Box sx={{ pb: { xs: 3, md: 5 } }}>
          <ProgramsCoursesCarousel
            courses={program.courses}
            _programId={program._id}
          />
        </Box>

        <Typography sx={{ whiteSpace: "pre-line", lineHeight: 1.4 }}>
          {program.description}
        </Typography>
      </Paper>
    </Container>
  );
};

export async function getServerSideProps(context) {
  const client = await clientPromise;
  const db = client.db();
  const program = await getOneProgram(db, context.params.programId);

  if (!program) return { props: {} };

  return {
    props: {
      program,
      topic: program.topic,
      subtopic: program.subtopic,
      title: program.title,
    },
  };
}

export default Program;
