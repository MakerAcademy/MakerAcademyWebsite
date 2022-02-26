import { Alert, Container, Snackbar } from "@mui/material";
import React, { useState } from "react";
import NewStudioForm from "@components/forms/NewStudioForm";
import { useRouter } from "next/router";

const CreatorStudioNew = () => {
  const router = useRouter();
  const [message, setMessage] = useState(null);

  const handleSubmit = async ({
    title,
    description,
    level,
    topic,
    subtopic,
    markdownValue,
  }) => {
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
        content_type: "document",
        duration: 30,
        author_id: "Zach Huang",
        body: markdownValue,
        thumbnail_url:
          "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.png",
      }),
    })
      .then((response) => {
        // console.log(response);
        return response;
      })
      .then(() => {
        setMessage({ type: "success", message: "This is a success message" });
      });
  };

  const handleClose = (redirect) => {
    if (message !== null) {
      const { type, message, id } = message;

      setMessage(null);

      // Change route based on the res id we get
      redirect && type === "success" && router.push("/studio");
    }
  };

  return (
    <Container sx={{ py: 5 }} maxWidth="xl">
      <NewStudioForm handleSubmit={handleSubmit} />

      <Snackbar open={!!message} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={message?.type}
          sx={{ width: "100%" }}
        >
          {message?.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreatorStudioNew;
