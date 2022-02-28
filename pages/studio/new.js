import { Container } from "@mui/material";
import React from "react";
import NewStudioForm from "@components/forms/NewStudioForm";

const CreatorStudioNew = () => {
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
    }).then((response) => {
      // console.log(response);
      return response;
    });
  };

  return (
    <Container sx={{ py: 5 }} maxWidth="xl">
      <NewStudioForm handleSubmit={handleSubmit} />
    </Container>
  );
};

export default CreatorStudioNew;
