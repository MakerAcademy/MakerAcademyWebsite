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

      <FormDraftField onChange={handleChange} hideHtml direction="row" />
    </Stack>
  );
};

export default DraftHtmlMarkdown;
