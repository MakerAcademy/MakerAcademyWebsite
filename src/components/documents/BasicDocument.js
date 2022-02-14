import ResponsiveText from "@components/ResponsiveText";
import ScrollSpy from "@components/ScrollSpy";
import styled from "@emotion/styled";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { flattenChildren } from "@utils/helperFunctions";
import {
  addChapters,
  createSlug,
  createTitle,
  extractHeadingsFromMd,
  getLevel,
  parseDepths,
} from "@utils/markdown";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import BackButton from "@components/buttons/BackButton";

const StyledMarkdown = styled(ReactMarkdown)`
  & > h2 {
    color: red;
  }
`;

const BasicDocument = ({ data = {} }) => {
  const [document, setDocument] = useState(data);
  const [ids, setIds] = useState([]);

  const { title, author, content, timestamp } = document;

  function HeadingRenderer(props) {
    var children = React.Children.toArray(props.children);
    var text = children.reduce(flattenChildren, "");
    var slug = createSlug(text);
    return React.createElement("h" + props.level, { id: slug }, props.children);
  }

  // Generate all Ids from headers
  useEffect(() => {
    if (content) {
      const headers = extractHeadingsFromMd(content);

      const _temp = headers?.reduce((acc, header) => {
        const title = createTitle(header);
        const slug = createSlug(title);
        const level = getLevel(header);
        return [...acc, { title, slug, level }];
      }, []);

      const _temp2 = parseDepths(_temp || []);
      const _temp3 = addChapters(_temp2 || []);

      setIds(_temp3 || []);
    }
  }, [content]);

  return (
    <Container sx={{ py: 8 }} maxWidth="xl">
      <Stack direction="row" spacing={5}>
        {ids.length > 0 && (
          <Box>
            <BackButton sx={{ mb: { xs: 1, md: 2 } }} />
            <ScrollSpy title="Table of Content" data={ids} />
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
                <Typography>{author}</Typography>
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                spacing={0.7}
              >
                <Typography>Posted {timestamp}</Typography>
              </Stack>
            </Stack>

            <Divider sx={{ mb: 3 }} />

            <Box sx={{ minHeight: "50vh" }}>
              <ReactMarkdown
                components={{
                  h1: HeadingRenderer,
                  h2: HeadingRenderer,
                  h3: HeadingRenderer,
                  h4: HeadingRenderer,
                  h5: HeadingRenderer,
                  h6: HeadingRenderer,
                }}
              >
                {content}
              </ReactMarkdown>
            </Box>
          </Stack>
        </Container>
      </Stack>
    </Container>
  );
};

export default BasicDocument;
