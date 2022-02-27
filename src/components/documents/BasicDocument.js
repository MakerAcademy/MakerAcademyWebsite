import BackButton from "@components/buttons/BackButton";
import ResponsiveText from "@components/ResponsiveText";
import ScrollSpy from "@components/ScrollSpy";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import { flattenChildren } from "@utils/helperFunctions";
import {
  addChapters,
  createSlug,
  createTitle,
  extractHeadingsFromMd,
  getLevel,
  parseDepths,
} from "@utils/markdown";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

function HeadingRenderer(props) {
  var children = React.Children.toArray(props.children);
  var text = children.reduce(flattenChildren, "");
  var slug = createSlug(text);
  return React.createElement("h" + props.level, { id: slug }, props.children);
}

const BasicDocument = ({ data = {} }) => {
  const [document, setDocument] = useState(data);
  const [ids, setIds] = useState([]);

  const { title, username, body, timestamp, contributors } = document;

  // Generate all Ids from markdown headings
  useEffect(() => {
    if (body) {
      const headers = extractHeadingsFromMd(body);
      const _ids = headers?.reduce((acc, header) => {
        const title = createTitle(header);
        const slug = createSlug(title);
        const level = getLevel(header);
        return [...acc, { title, slug, level }];
      }, []);

      const _temp2 = parseDepths(_ids || []);
      const _temp3 = addChapters(_temp2 || []);

      setIds(_temp3 || []);
    }
  }, [body]);

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
              <Stack direction="row" spacing={1}>
                <Brightness1Icon sx={{ fontSize: 18, mt: 0.1 }} />
                <Stack>
                  <Typography>Author: {username}</Typography>
                  <Typography>
                    Contributors:{" "}
                    {contributors &&
                      contributors.map(
                        (person, i) =>
                          `${person}${i < contributors.length - 1 ? ", " : ""}`
                      )}
                  </Typography>
                </Stack>
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                spacing={0.7}
              >
                <Typography>Posted {moment(timestamp).format("LL")}</Typography>
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
