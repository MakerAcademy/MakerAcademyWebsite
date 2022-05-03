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

  const isCourse = data.contentType === "courses";

  const _id = router.query.id;

  const handleDocumentSubmit = async ({
    title,
    description,
    level,
    topic,
    subtopic,
    markdownValue,
    brand,
  }) => {
    const res = await fetch(`/api/documents?_id=${_id}`, {
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
        brand,
        contentType: "documents",
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
        setSubmitted({
          type: "success",
          message: "Successfully submitted edit! Redirecting to studio...",
        });
      });
  };

  const handleCourseSubmit = async ({
    title,
    description,
    level,
    topic,
    subtopic,
    documents,
  }) => {
    const res = await fetch(`/api/courses?_id=${_id}`, {
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
        contentType: "courses",
        duration: 30,
        author: user?._id,
        documents: documents || [],
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
        setSubmitted({
          type: "success",
          message: "Successfully submitted edit! Redirecting to studio...",
        });
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

  const DocumentForm = dynamic(() => import("@components/forms/DocumentForm"));
  const CourseForm = dynamic(() => import("@components/forms/CourseForm"));

  return (
    <Container sx={{ py: 5 }} maxWidth="xl">
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <BackButton />

        <Typography variant="h6">
          Edit {isCourse ? "Course" : "Document"}
        </Typography>
      </Stack>

      {isCourse ? (
        <CourseForm
          handleSubmit={handleCourseSubmit}
          edit
          values={data || {}}
        />
      ) : (
        <DocumentForm
          handleSubmit={handleDocumentSubmit}
          edit
          values={{ ...(data || {}), markdown: data?.body }}
        />
      )}

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
  const contentType = context.params.contentType?.toLowerCase();
  const url = `${http}${server}/api/${contentType}?_id=${docId}`;

  const res = await fetch(url, {
    method: "GET",
  });

  const jsonData = await res.json();

  return { props: { data: jsonData.message } };
});
