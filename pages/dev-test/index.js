/* eslint-disable @next/next/no-css-tags */
import PdfViewer from "@components/PdfViewer";
import { Container, Divider, Typography } from "@mui/material";
import { buildGithubPdfLink } from "@utils/helperFunctions";
import React from "react";

const DevTest = () => {
  const _link = buildGithubPdfLink("tpn", "pdfs", "master", "AMD - CPUID.pdf");

  console.log(_link);

  return (
    <Container sx={{ py: 5 }}>
      {/* PDF */}
      <Typography>PDF Example</Typography>
      <PdfViewer url={_link} sx={{ height: 750 }} fromGoogleDocs />

      <Divider sx={{ my: 3 }} />
    </Container>
  );
};

// export const getServerSideProps = withProtectedUser(null, { trustLevel: 1 });

export default DevTest;
