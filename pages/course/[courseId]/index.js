import BreadcrumbsSection from "@components/BreadcrumbsSection";
import RoundedButton from "@components/buttons/RoundedButton";
import ResponsiveText from "@components/ResponsiveText";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import {
  Box,
  Card,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { connectToDB } from "../../../lib/db/connect";
import { getOneCourse } from "../../../lib/db/course";

const CoursePage = ({ course, topic, subtopic, title }) => {
  const { query } = useRouter();
  const documents = course.documents;
  const [c, setC] = useState(course.documents);
  const { courseId, programId } = query;

  const firstDocId = course?.documents?.[0]?._id;

  const breadcrumbs = [
    { label: "Content", href: "/content" },
    { label: topic, href: "/content" },
    { label: subtopic, href: "/content" },
    { label: title, active: true },
  ];

  // useEffect(() => {}, [c]);

  const buildRedirect = (_id) => {
    if (programId)
      return `/programs/${programId}/course/${courseId}/document/${_id}`;

    return `/course/${courseId}/documents/${_id}`;
  };

  const DocumentCard = ({
    _id,
    thumbnail_url,
    title,
    description,
    author_id,
    duration,
  }) => {
    return (
      <Link href={buildRedirect(_id)} passHref>
        <Card elevation={3} sx={{ cursor: "pointer" }}>
          <Box sx={{ p: 2 }}>
            <Grid container spacing={{ xs: 2, md: 3 }}>
              <Grid item xs={12} sm={4} md={3} lg={2}>
                <img
                  src={thumbnail_url}
                  alt={title}
                  style={{
                    maxHeight: 200,
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={8} md={9} lg={10}>
                <Stack spacing={2}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {title}
                  </Typography>

                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Brightness1Icon sx={{ fontSize: 18 }} />
                    <Typography>{author_id}</Typography>
                  </Stack>

                  <Typography>{description}</Typography>

                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                    spacing={0.7}
                  >
                    <AccessTimeIcon sx={{ fontSize: 18 }} />
                    <Typography>{duration} mins</Typography>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Link>
    );
  };

  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      {/* TODO - build breadcrumbs from util function based on route */}
      <BreadcrumbsSection breadcrumbs={breadcrumbs} align="flex-start" />

      <Paper sx={{ p: 4, pb: { md: 6 }, mt: 4 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ pb: 3 }}
        >
          <ResponsiveText variant="h5">{course.title}</ResponsiveText>

          <RoundedButton
            variant="outlined"
            sx={{ height: 40 }}
            href={buildRedirect(firstDocId)}
          >
            Begin
          </RoundedButton>
        </Stack>

        {course.description && (
          <ResponsiveText sx={{ pb: 4 }}>{course.description}</ResponsiveText>
        )}

        <Stack sx={{ pb: { xs: 3, md: 5 } }} spacing={3}>
          {c.length > 0
            ? c.map((doc, i) => <DocumentCard key={i} {...doc} />)
            : documents.map((doc, i) => <DocumentCard key={i} {...doc} />)}
        </Stack>
      </Paper>
    </Container>
  );
};

export async function getServerSideProps(context) {
  const { db } = await connectToDB();
  const course = await getOneCourse(db, context.params.courseId);
  const c = course[0];
  return {
    props: {
      course: c,
      topic: c.topic,
      subtopic: c.subtopic,
      title: c.title,
    },
  };
}

export default CoursePage;
