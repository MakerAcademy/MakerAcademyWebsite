import BreadcrumbsSection from "@components/BreadcrumbsSection";
import RoundedButton from "@components/buttons/RoundedButton";
import ProgramsCoursesCarousel from "@components/carousels/ProgramsCoursesCarousel";
import ResponsiveText from "@components/ResponsiveText";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { connectToDB } from "../../../lib/db/connect";
import { getOneProgram } from "../../../lib/db/program";

const Program = ({ program, topic, subtopic, title }) => {
  const { query } = useRouter();
  const { programId } = query;

  console.log(program);

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
          sx={{ pb: 4 }}
        >
          <ResponsiveText variant="h5">{title}</ResponsiveText>

          <RoundedButton
            variant="outlined"
            sx={{ height: 40 }}
            href={`/programs/${programId}/course/${firstCourseId}`}
          >
            Begin
          </RoundedButton>
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
  const { db } = await connectToDB();
  // console.log(context.params);
  const program = await getOneProgram(db, context.params.programId);
  const p = program[0];
  // console.log(p);
  return {
    props: {
      program: p,
      topic: p.topic,
      subtopic: p.subtopic,
      title: p.title,
    },
  };
}

export default Program;
