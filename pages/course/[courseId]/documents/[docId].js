import CourseDocument from "@components/documents/CourseDocument";
import React from "react";
import clientPromise from "../../../../lib/db/connect";
import { getOneDocument } from "../../../../lib/db/document";
import BasicDocument from "@components/documents/BasicDocument";

const DocumentPage = ({ doc }) => {
  return (
    <div>
      <BasicDocument data={doc} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const id = context.params.docId;

  if (!id) {
    return {
      props: {
        doc: [],
      },
    };
  }

  const client = await clientPromise;
  const db = client.db();
  const doc = await getOneDocument(db, id);
  return {
    props: {
      doc: doc,
    },
  };
}

export default DocumentPage;
