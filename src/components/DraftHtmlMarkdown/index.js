import FormDraftField from "@components/formComponents/FormDraft";
import { Chip, Stack, Typography } from "@mui/material";
import React from "react";

const DraftHtmlMarkdown = ({
  title,
  description,
  level,
  topic,
  subtopic,
  handleChange,
}) => {
  const hasChips = level || topic || subtopic;

  const handleSubmit = async (markdownValue) => {
    const res = await fetch('/api/documents', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json'
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
      })
    }).then((response) => {
      console.log(response);
      return response;
    })
  }

  return (
    <Stack spacing={3}>
      {title && <Typography variant="h6">{title}</Typography>}

      {description && (
        <Typography sx={{ fontWeight: 600 }}>{description}</Typography>
      )}

      {hasChips && (
        <Stack direction="row" spacing={2}>
          {level && <Chip label={level} />}
          {topic && <Chip label={topic} />}
          {subtopic && <Chip label={subtopic} />}
        </Stack>
      )}

      <FormDraftField onChange={handleChange} handeSubmit={handleSubmit()} hideHtml direction="row" />
    </Stack>
  );
};

export default DraftHtmlMarkdown;
