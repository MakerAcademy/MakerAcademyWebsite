/* eslint-disable @next/next/no-css-tags */
import AssessmentBuilderForm from "@components/forms/AssessmentBuilderForm";
import PdfViewer from "@components/PdfViewer";
import { withProtectedUser } from "@hoc/routes";
import { Container, Divider, Typography } from "@mui/material";
import Head from "next/head";
import React from "react";
import Latex from "react-latex";

const LaTeX =
  "We give illustrations for the three processes $e^+e^-$, gluon-gluon and $\\gamma\\gamma \\to W t\\bar b$.";

const DevTest = () => {
  return (
    <Container sx={{ py: 5 }}>
      <Head>
        <link
          href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css"
          rel="stylesheet"
        />
      </Head>

      {/* PDF */}
      {/* <Typography>PDF Example</Typography>
      <PdfViewer
        url="https://www.orimi.com/pdf-test.pdf"
        sx={{ height: 750 }}
      /> */}

      <Divider sx={{ my: 3 }} />

      {/* Latex */}
      {/* <Typography>Latex Example 1</Typography>
      <Latex>{LaTeX}</Latex>

      <Divider sx={{ my: 3 }} /> */}

      {/* Quiz Form */}
      <Typography>Assessment Form</Typography>
      <AssessmentBuilderForm />
    </Container>
  );
};

// export const getServerSideProps = withProtectedUser(null, { trustLevel: 1 });

export default DevTest;
