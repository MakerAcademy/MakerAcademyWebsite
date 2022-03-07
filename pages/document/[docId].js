import BasicDocument from "@components/documents/BasicDocument";
import React from "react";
import clientPromise from "../../lib/db/connect";
import { getOneDocument, incrementDocViews } from "../../lib/db/document";

const DocumentPage = (props) => {
  const { doc = {} } = props;

  return (
    <div>
      <BasicDocument data={doc} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const docId = context.params.docId;

  const client = await clientPromise;
  const db = client.db();
  const doc = await getOneDocument(db, docId);
  const result = await incrementDocViews(db, docId);

  return {
    props: {
      doc: doc,
    },
  };
}

export default DocumentPage;
