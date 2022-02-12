import BasicDocument from "@components/documents/BasicDocument";
import ScrollSpy from "@components/ScrollSpy";
import { Container, Stack, Box } from "@mui/material";
import React from "react";
import { dummyMarkdown } from "@utils/markdown";

const DUMMY_DOCUMENT = {
  title: "Document Title",
  author: "John doe",
  timestamp: "Jan 31, 2022",
  content: dummyMarkdown,
};

const DocumentPage = () => {
  return (
    <div>
      <BasicDocument data={DUMMY_DOCUMENT} />
    </div>
  );
};

export default DocumentPage;
