import ResponsiveText from "@components/ResponsiveText";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";

// TODO: Left side navigation on text scroll

const CourseDocument = ({ data = {} }) => {
  const [document, setDocument] = useState(data);

  return (
    <Container sx={{ py: 8 }}>
      <Stack spacing={3}>
        <ResponsiveText variant="h3" sx={{ fontWeight: 600 }}>
          {document.title}
        </ResponsiveText>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Brightness1Icon sx={{ fontSize: 18 }} />
            <Typography>{document.author_id}</Typography>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            spacing={0.7}
          >
            <Typography>
              Posted {moment(document.timestamp).format("LL")}
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ minHeight: "50vh" }}>
          <Typography>{document.description}</Typography>
        </Box>
      </Stack>
    </Container>
  );
};

export default CourseDocument;
