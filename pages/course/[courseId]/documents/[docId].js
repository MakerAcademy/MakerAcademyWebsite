import CourseDocument from "@components/documents/CourseDocument";
import React from "react";

const DUMMY_DOCUMENT = {
  title: "Document Title",
  description: "A long HTML formatted description here",
  author: "John doe",
  timestamp: "Jan 31, 2022",
};

const DocumentPage = () => {
  return <CourseDocument data={DUMMY_DOCUMENT} />;
};

export default DocumentPage;
