import BreadcrumbsSection from "@components/BreadcrumbsSection";
import RoundedButton from "@components/buttons/RoundedButton";
import ResponsiveText from "@components/ResponsiveText";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import clientPromise from "../../../lib/db/connect";
import { getOneCourse } from "../../../lib/db/course";

export const generateCourseRoutes = (courseId, docId, documents) => {
  const _index = documents.findIndex((i) => i._id === docId);
  const _previous = _index > 0 && documents[_index - 1];
  const _next = _index < documents.length - 1 && documents[_index + 1];

  const previousRoute =
    _previous &&
    `/course/${courseId}/${
      _previous.contentType === "assessments" ? "assessment" : "document"
    }/${_previous._id}`;

  const nextRoute =
    _next &&
    `/course/${courseId}/${
      _next.contentType === "assessments" ? "assessment" : "document"
    }/${_next._id}`;

  return { previousRoute, nextRoute };
};

const CoursePage = ({
  course,
  topic,
  subtopic,
  title,
  likes = [],
  liked = false,
}) => {
  const { query } = useRouter();
  const documents = course.documents; //course.docs
  const { courseId, programId } = query;

  if (!course) {
    return (
      <Container maxWidth="xl" sx={{ py: 8 }}>
        Course Not Found
      </Container>
    );
  }

  const firstDocId = course?.documents?.[0]?._id;

  const breadcrumbs = [
    { label: "Content", href: "/content" },
    { label: topic, href: "/content" },
    { label: subtopic, href: "/content" },
    { label: title, active: true },
  ];

  const buildRedirect = (_id, contentType) => {
    const _type = contentType === "assessments" ? "assessment" : "document";

    if (programId)
      return `/programs/${programId}/course/${courseId}/${_type}/${_id}`;

    return `/course/${courseId}/${_type}/${_id}`;
  };

  const DocumentCard = (cardProps) => {
    const {
      _id,
      thumbnail,
      title,
      description,
      topic,
      subtopic,
      duration,
      contentType,
    } = cardProps;

    return (
      <Link href={buildRedirect(_id, contentType)} passHref>
        <Card elevation={3} sx={{ cursor: "pointer" }}>
          <Box sx={{ p: 2 }}>
            <Grid container spacing={{ xs: 2, md: 3 }}>
              <Grid item xs={12} sm={4} md={3} lg={2}>
                <img
                  src={thumbnail}
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
                    <Typography>
                      {topic} • {subtopic}
                    </Typography>
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

        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          sx={{ pb: 2 }}
        >
          {course.description && (
            <ResponsiveText sx={{ flex: 1 }}>
              {course.description}
            </ResponsiveText>
          )}

          <Button color="inherit">
            {liked ? (
              <FavoriteIcon sx={{ fontSize: 18, mr: 0.5 }} />
            ) : (
              <FavoriteBorderIcon sx={{ fontSize: 18, mr: 0.5 }} />
            )}
            <Typography variant="body2">{liked ? "Unlike" : "Like"}</Typography>
          </Button>
        </Stack>

        <Stack sx={{ pb: { xs: 3, md: 5 } }} spacing={3}>
          {documents.map((doc, i) => (
            <DocumentCard key={i} {...doc} />
          ))}
        </Stack>
      </Paper>
    </Container>
  );
};

export async function getServerSideProps(context) {
  const client = await clientPromise;
  const db = client.db();
  const course = await getOneCourse(db, context.params.courseId);

  if (!course) return { props: {} };

  return {
    props: {
      course: course,
      topic: course.topic,
      subtopic: course.subtopic,
      title: course.title,
    },
  };
}

export default CoursePage;
