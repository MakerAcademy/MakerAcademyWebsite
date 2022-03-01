import BackButton from "@components/buttons/BackButton";
import { http } from "@config/";
import { Alert, Container, Snackbar, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { withProtectedUser } from "@hoc/routes";

const CreatorStudioEdit = (props) => {
  const { data, user } = props;
  const router = useRouter();
  const [submitted, setSubmitted] = useState(null);

  const _id = router.query.id;

  const handleSubmit = async ({
    title,
    description,
    level,
    topic,
    subtopic,
    markdownValue,
  }) => {
    const res = await fetch(`/api/documents?_id=${_id}`, {
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
        contentType: "document",
        duration: 30,
        author: user?._id,
        body: markdownValue,
        thumbnail:
          "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.png",
        status: "submitted",
      }),
    })
      .then((response) => {
        console.log("Client: ", response);
        return response;
      })
      .then(() => {
        setSubmitted({ type: "success", message: "This is a success message" });
      });
  };

  const handleClose = () => {
    if (submitted) {
      const { type } = submitted || {};

      // Change route based on the res id we get
      type === "success" && router.push("/studio/content");

      setSubmitted(null);
    }
  };

  if (typeof window === "undefined") {
    return <Container sx={{ py: 5 }} maxWidth="xl" />;
  }

  const NewStudioForm = dynamic(() =>
    import("@components/forms/NewStudioForm")
  );

  return (
    <Container sx={{ py: 5 }} maxWidth="xl">
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <BackButton />

        <Typography variant="h6">Edit Document</Typography>
      </Stack>

      <NewStudioForm
        handleSubmit={handleSubmit}
        edit
        values={{ ...(data || {}), markdown: data?.body }}
      />

      {submitted && (
        <Snackbar
          open={!!submitted}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={submitted?.type}
            sx={{ width: "100%" }}
          >
            {submitted?.message}
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default CreatorStudioEdit;

export const getServerSideProps = withProtectedUser(async (context) => {
  const server = context.req.headers.host;
  const docId = context.params.id;
  const url = `${http}${server}/api/documents?_id=${docId}`;

  const res = await fetch(url, {
    method: "GET",
  });
  const jsonData = await res.json();

  return { props: { data: jsonData.message } };
});
