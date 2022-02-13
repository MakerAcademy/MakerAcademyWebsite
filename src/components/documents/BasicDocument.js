import ResponsiveText from "@components/ResponsiveText";
import ScrollSpy from "@components/ScrollSpy";
import styled from "@emotion/styled";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import { flattenChildren } from "@utils/helperFunctions";
import {
  createSlug,
  createTitle,
  extractHeadingsFromMd,
} from "@utils/markdown";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const StyledMarkdown = styled(ReactMarkdown)`
  & > h2 {
    color: red;
  }
`;

const BasicDocument = ({ data = {} }) => {
  const [document, setDocument] = useState(data);
  const [ids, setIds] = useState([]);

  console.log(data);

  const { title, author_id, body, timestamp } = document;

  function HeadingRenderer(props) {
    var children = React.Children.toArray(props.children);
    var text = children.reduce(flattenChildren, "");
    var slug = createSlug(text);
    console.log("test", children, text, slug);
    return React.createElement("h" + props.level, { id: slug }, props.children);
  }

  // Generate all Ids from headers
  useEffect(() => {
    if (body) {
      const headers = extractHeadingsFromMd(body);
      const _ids = headers?.reduce((acc, header) => {
        const title = createTitle(header);
        const slug = createSlug(title);
        return [...acc, { title, slug }];
      }, []);

      setIds(_ids || []);
    }
  }, [body]);

  return (
    <Container sx={{ py: 8 }} maxWidth="xl">
      <Stack direction="row" spacing={5}>
        {ids.length > 0 && (
          <Box>
            <ScrollSpy title="Content" data={ids} />
          </Box>
        )}

        <Container>
          <Stack spacing={3}>
            <ResponsiveText variant="h3" sx={{ fontWeight: 600 }}>
              {title}
            </ResponsiveText>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Brightness1Icon sx={{ fontSize: 18 }} />
                <Typography>{author_id}</Typography>
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                spacing={0.7}
              >
                <Typography>Posted {new Date(timestamp).toDateString()}</Typography>
              </Stack>
            </Stack>

            <Divider sx={{ mb: 3 }} />

            <Box sx={{ minHeight: "50vh" }}>
              <ReactMarkdown components={{ h2: HeadingRenderer }}>
                {body}
              </ReactMarkdown>
            </Box>
          </Stack>
        </Container>
      </Stack>
    </Container>
  );
};

export default BasicDocument;
