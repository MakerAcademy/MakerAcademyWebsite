import BasicDocument from "@components/documents/BasicDocument";
import React from "react";
import clientPromise from "../../../../../../lib/db/connect";
import { getOneDocument } from "../../../../../../lib/db/document";

const DocumentPage = ({ doc }) => {
  return <BasicDocument data={doc} />;
};

export async function getServerSideProps(context) {
  const client = await clientPromise;
  const db = client.db();
  const doc = await getOneDocument(db, context.params.docId);
  return {
    props: {
      doc: doc,
    },
  };
}

export default DocumentPage;
