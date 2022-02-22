import { Container } from "@mui/material";
import React from "react";
import DraftHtmlMarkdown from "@components/DraftHtmlMarkdown";

const CreatorStudioNew = () => {
  const handleChange = ({ editor, markdown, html }) => {
    console.log(markdown);
    // console.log(markdown);
  };

  return (
    <Container sx={{ py: 5 }} maxWidth="xl">
      <DraftHtmlMarkdown
        title="Title 1"
        description="Description here"
        level="Beginner"
        topic="Topic"
        subtopic="Sub Topic"
        handleChange={handleChange}
      />
    </Container>
  );
};

export default CreatorStudioNew;
