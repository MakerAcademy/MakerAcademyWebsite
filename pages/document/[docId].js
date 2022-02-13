import BasicDocument from "@components/documents/BasicDocument";
import ScrollSpy from "@components/ScrollSpy";
import { Container, Stack, Box } from "@mui/material";
import React from "react";
import { dummyMarkdown } from "@utils/markdown";
import { connectToDB } from "../../db/connect";
import { getOneDocument } from "../../db/document";

const DUMMY_DOCUMENT = {
  title: "Document Title",
  author: "John doe",
  timestamp: "Jan 31, 2022",
  content: dummyMarkdown,
};

const DocumentPage = (props) => {
  const {doc = {}} = props
  return (
    <div>
      <BasicDocument data={doc} />
    </div>
  );
};


export async function getServerSideProps(context) {
  const {db} = await connectToDB();
  console.log('ID :', context.params.docId);
  const doc = await getOneDocument(db, context.params.docId);
  return {
    props: {
      doc: doc
    }
  }
}

export default DocumentPage;
