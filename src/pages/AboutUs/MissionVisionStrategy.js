import MSV_IMAGE from "@assets/images/misc/msv.png";
import { Box, Container, Typography } from "@mui/material";
import msvMarkdown from "@utils/msvMarkdown";
import React from "react";
import ReactMarkdown from "react-markdown";

function HeadingRenderer(props) {
  const level = props.level;
  return (
    <Typography variant={`h${level}`} sx={{ my: level >= 5 ? 1.2 : 2 }}>
      {props.children}
    </Typography>
  );
}

function ParagraphRenderer(props) {
  const isImage = props.children?.[0] === "IMAGE HERE";

  if (isImage)
    return (
      <img
        src={MSV_IMAGE}
        style={{
          height: "100%",
          width: "100%",
          maxWidth: 700,
          objectFIt: "contain",
          padding: 20,
        }}
      />
    );

  return <Typography sx={{ pb: 1 }}>{props.children}</Typography>;
}

const MissionVisionStrategy = () => {
  return (
    <Container maxWidth='lg' sx={{ mt: -2 }}>
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
    </Container>
  );
};

export default MissionVisionStrategy;
