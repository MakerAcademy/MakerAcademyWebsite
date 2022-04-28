import MSV_IMAGE from "@assets/images/misc/msv.png";
import BackButton from "@components/buttons/BackButton";
import ScrollSpy from "@components/ScrollSpy";
import { Box, Stack, Typography } from "@mui/material";
import { flattenChildren } from "@utils/helperFunctions";
import {
  addChapters,
  createSlug,
  createTitle,
  extractHeadingsFromMd,
  getLevel,
  parseDepths,
} from "@utils/markdown";
import msvMarkdown from "@utils/msvMarkdown";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

function HeadingRenderer(props) {
  const level = props.level;

  var children = React.Children.toArray(props.children);
  var text = children.reduce(flattenChildren, "");
  var slug = createSlug(text);

  const isBigText = level <= 5;

  return (
    <>
      <Typography
        variant={`h${level}`}
        sx={{
          my: isBigText ? 2 : 1.2,
          borderTop: isBigText && "2px solid grey",
          borderBottom: isBigText && "2px solid grey",
          py: isBigText && 0.5,
          textAlign: isBigText && "center",
        }}
        id={slug}
      >
        {props.children}
      </Typography>
    </>
  );
}

function ParagraphRenderer(props) {
  const isImage = props.children?.[0] === "IMAGE HERE";

  if (isImage)
    return (
      <img
        src={MSV_IMAGE}
        style={{
          width: "100%",
          maxWidth: 700,
          objectFit: "contain",
          padding: 20,
        }}
      />
    );

  return <Typography sx={{ pb: 1 }}>{props.children}</Typography>;
}

const MissionVisionStrategy = () => {
  const [ids, setIds] = useState([]);

  // Generate all Ids from markdown headings
  useEffect(() => {
    if (msvMarkdown) {
      const headers = extractHeadingsFromMd(msvMarkdown);
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
  }, []);

  return (
    <Box sx={{ mt: -2 }}>
      <Stack direction="row" spacing={{ xs: 5, md: 8 }}>
        {ids.length > 0 && (
          <Box>
            <BackButton sx={{ mb: { xs: 1, md: 2 } }} />
            <ScrollSpy title="Table of Content" data={ids} />
          </Box>
        )}

        <Box>
          <ReactMarkdown
            components={{
              h1: HeadingRenderer,
              h2: HeadingRenderer,
              h3: HeadingRenderer,
              h4: HeadingRenderer,
              h5: HeadingRenderer,
              h6: HeadingRenderer,
              p: ParagraphRenderer,
            }}
          >
            {msvMarkdown}
          </ReactMarkdown>
        </Box>
      </Stack>
    </Box>
  );
};

export default MissionVisionStrategy;
