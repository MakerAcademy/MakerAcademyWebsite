import { Alert, Container, Snackbar } from "@mui/material";
import React, { useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { withProtectedUser } from "@hoc/routes";

const CreatorStudioNew = ({ user }) => {
  const router = useRouter();
  const [message, setMessage] = useState(null);

  if (typeof window === "undefined")
    return <Container sx={{ py: 5 }} maxWidth="xl" />;

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
        contentType: "documents",
        duration: 30,
        author: author_id,
        body: markdownValue,
        thumbnail:
          "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.png",
      }),
    })
      .then((response) => {
        console.log(response);
        return response;
      })
      .then(() => {
        setMessage({ type: "success", message: "This is a success message" });
      });
  };

  const handleClose = (redirect) => {
    if (message !== null) {
      const { type, message, id } = message || {};

      // Change route based on the res id we get
      redirect && type === "success" && router.push("/studio");
    }
  };

  const NewStudioForm = dynamic(() =>
    import("@components/forms/NewStudioForm")
  );

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

export const getServerSideProps = withProtectedUser();

export default CreatorStudioNew;
