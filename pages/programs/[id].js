import BreadcrumbsSection from "@components/BreadcrumbsSection";
import RoundedButton from "@components/buttons/RoundedButton";
import ProgramsCoursesCarousel from "@components/carousels/ProgramsCoursesCarousel";
import ResponsiveText from "@components/ResponsiveText";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";

const DUMMY_PROGRAM = {
  title: "Facilitator Onboarding Program",
  subtitle:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse placerat elit in nulla porttitor tempus. Donec suscipit velit sit amet purus cursus dictum. ",
  description:
    "Purpose\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet posuere sem. Curabitur vitae massa lobortis mi finibus auctor. Donec ipsum diam, finibus nec quam vel, rutrum interdum nisl. Nullam at tellus purus. Vestibulum commodo enim eget lacus vestibulum vehicula. Mauris egestas viverra sodales. Aliquam vel turpis venenatis, eleifend ante in, rutrum massa.\n\nIn sit amet iaculis neque. Donec id nibh justo. Vestibulum lorem lectus, tempor nec consequat in, mattis eget est. Curabitur eget odio sed magna scelerisque ultricies in eget magna. Mauris sodales, tortor ut ullamcorper imperdiet, elit odio lobortis orci, a congue risus sem quis nunc. Aliquam dapibus ut sem eget aliquam. Cras pulvinar libero quis purus varius, eu volutpat lectus volutpat. Quisque nec odio in sem pellentesque laoreet. Phasellus at nibh eu ipsum congue molestie. Duis neque lorem, sollicitudin vel tortor in, tincidunt faucibus nulla. Integer facilisis vestibulum hendrerit. Proin luctus consectetur sem, vitae egestas magna rutrum ac.\n\nSuspendisse fringilla augue ut pellentesque lobortis. Praesent velit libero, convallis ac sollicitudin vitae, congue malesuada nisl. Proin in erat ac lectus lacinia euismod. Sed consectetur accumsan dolor in iaculis. Phasellus congue leo in varius laoreet. Sed volutpat a sem ac gravida. Ut at risus sit amet arcu malesuada condimentum. Sed convallis neque ut nibh efficitur, nec bibendum augue lacinia. Donec pulvinar quam at est gravida, varius volutpat magna consequat.",
  courses: [
    ...Array(12)
      .fill()
      .map((i) => ({
        title: "Lorem Ipsum is simply dummy text",
        tags: ["Onboarding", "Maker"],
        timestamp: "Jan 27 2020",
        content_type: "beginner",
        duration: 8,
      })),
  ],
};

const Program = () => {
  const [program, setProgram] = useState(DUMMY_PROGRAM);

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
          <ResponsiveText variant="h5">
            Facilitator Onboarding Program
          </ResponsiveText>

          <RoundedButton variant="outlined" sx={{ height: 40 }}>
            Begin
          </RoundedButton>
        </Stack>

        <Box sx={{ pb: { xs: 3, md: 5 } }}>
          <ProgramsCoursesCarousel courses={program.courses} />
        </Box>

        <Container>
          <Typography sx={{ whiteSpace: "pre-line", lineHeight: 1.4 }}>
            {program.description}
          </Typography>
        </Container>
      </Paper>
    </Container>
  );
};

export default Program;
