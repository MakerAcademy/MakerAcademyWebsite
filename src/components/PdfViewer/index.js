import { Box } from "@mui/material";
import React from "react";

const PdfViewer = ({ url, sx = {} }) => {
  return (
    <Box sx={{ ...sx }}>
      <embed
        style={{
          width: "100%",
          height: "100%",
        }}
        type="application/pdf"
        src={url}
      />
    </Box>
  );
};

export default PdfViewer;
