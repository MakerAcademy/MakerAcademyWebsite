import { Alert, Container, Snackbar, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import BackButton from "@components/buttons/BackButton";
import { withProtectedUser } from "@hoc/routes";

const CreatorStudioNewCourse = ({ user }) => {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(null);

  if (typeof window === "undefined")
    return <Container sx={{ py: 5 }} maxWidth="xl" />;

  const handleSubmit = async (data) => {
    const { title, description, level, topic, subtopic, markdownValue } = data;

    return await fetch("/api/documents", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        level: level,
        topic: topic,
        subtopic: subtopic,
        contentType: "documents",
        duration: 30,
        author: user?._id,
        body: markdownValue,
        thumbnail:
          "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.png",
        status: "published",
      }),
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then(({ _id }) => {
        setSubmitted({
          type: "success",
          message:
            "Successfully created document. Redirecting to document page...",
          _id,
        });
      });
  };

  const handleSnackbarClose = () => {
    if (submitted) {
      const { type, message, _id } = submitted || {};

      // Change route based on the res id we get
      type === "success" && router.push(`/course/${_id}`);

      setSubmitted(null);
    }
  };

  const CourseForm = dynamic(() => import("@components/forms/CourseForm"));

  return (
    <Container sx={{ py: 5 }} maxWidth="xl">
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <BackButton />
        <Typography variant="h6">Create a New Course</Typography>
      </Stack>

      {/* Form */}
      <CourseForm handleSubmit={handleSubmit} />

      {/* Submitted alert */}
      {submitted && (
        <Snackbar
          open={!!submitted}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
        >
          <Alert severity={submitted?.type} sx={{ width: "100%" }}>
            {submitted?.message}
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export const getServerSideProps = withProtectedUser();

export default CreatorStudioNewCourse;
