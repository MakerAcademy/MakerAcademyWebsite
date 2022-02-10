import BasicDocument from "@components/documents/BasicDocument";
import React from "react";

const DUMMY_DOCUMENT = {
  title: "Document Title",
  description: "A long HTML formatted description here",
  author: "John doe",
  timestamp: "Jan 31, 2022",
};

const DocumentPage = () => {
  return <BasicDocument data={DUMMY_DOCUMENT} />;
};

export default DocumentPage;
