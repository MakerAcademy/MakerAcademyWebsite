import BackButton from "@components/buttons/BackButton";
import CourseForm from "@components/forms/CourseForm";
import { withProtectedUser } from "@hoc/routes";
import {
  Alert,
  Container,
  Snackbar,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useState } from "react";

const CreatorStudioNewDocument = ({ user }) => {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(null);
  const [type, setType] = useState("document");

  if (typeof window === "undefined")
    return <Container sx={{ py: 5 }} maxWidth="xl" />;

  const handleDocumentSubmit = async (data) => {
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
      .then((response) => {
        const { _id } = response;

        setSubmitted({
          type: "success",
          message:
            "Successfully created document. Redirecting to document page...",
          _id,
        });
      });
  };

  const handleCourseSubmit = async (data) => {
    const { title, description, level, topic, subtopic, documents = [] } = data;

    return await fetch("/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        title,
        description,
        level,
        topic,
        subtopic,
        documents,
        contentType: "course",
        duration: 30,
        author: user?._id,
        thumbnail:
          "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.png",
        status: "published",
      }),
    })
      // .then((response) => {
      //   if (response.ok) return response.json();
      // })
      // .then((response) => {
      //   const { _id } = response;

      //   setSubmitted({
      //     type: "success",
      //     message:
      //       "Successfully created document. Redirecting to document page...",
      //     _id,
      //   });
      // });
  };

  const handleTypeChange = () => {
    setType((old) => (old === "document" ? "course" : "document"));
  };

  const handleSnackbarClose = () => {
    if (submitted) {
      const { type, message, _id } = submitted || {};

      // Change route based on the res id we get
      type === "success" && router.push(`/document/${_id}`);

      setSubmitted(null);
    }
  };

  const DocumentForm = dynamic(() => import("@components/forms/DocumentForm"));

  return (
    <Container sx={{ py: 5 }} maxWidth="xl">
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <BackButton />
        <Typography variant="h6">Create New Content</Typography>
      </Stack>

      <ToggleButtonGroup
        color="primary"
        value={type}
        exclusive
        onChange={handleTypeChange}
        fullWidth
        sx={{ maxWidth: 450, mb: 3 }}
      >
        <ToggleButton value="document">Document</ToggleButton>
        <ToggleButton value="course">Course</ToggleButton>
      </ToggleButtonGroup>

      {/* Form */}
      {type === "document" && (
        <DocumentForm handleSubmit={handleDocumentSubmit} />
      )}

      {type === "course" && <CourseForm handleSubmit={handleCourseSubmit} />}

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

export default CreatorStudioNewDocument;
