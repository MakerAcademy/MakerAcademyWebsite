import { Alert, Container, Snackbar, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import BackButton from "@components/buttons/BackButton";
import { withProtectedUser } from "@hoc/routes";

const CreatorStudioNew = ({ user }) => {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(null);

  console.log(user);

  if (typeof window === "undefined")
    return <Container sx={{ py: 5 }} maxWidth="xl" />;

  const handleSubmit = async (data) => {
    const { title, description, level, topic, subtopic, markdownValue } = data;

    const res = await fetch("/api/documents", {
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
          message: "This is a success message",
          _id,
        });
      });
  };

  const handleClose = () => {
    if (submitted) {
      const { type, message, _id } = submitted || {};

      // Change route based on the res id we get
      type === "success" && router.push(`/document/${_id}`);

      setSubmitted(null);
    }
  };

  const NewStudioForm = dynamic(() =>
    import("@components/forms/NewStudioForm")
  );

  return (
    <Container sx={{ py: 5 }} maxWidth="xl">
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <BackButton />

        <Typography varaint="h5">Create a New Document</Typography>
      </Stack>

      <NewStudioForm handleSubmit={handleSubmit} />

      {submitted && (
        <Snackbar
          open={!!submitted}
          autoHideDuration={3000}
          onClose={handleClose}
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

export default CreatorStudioNew;
