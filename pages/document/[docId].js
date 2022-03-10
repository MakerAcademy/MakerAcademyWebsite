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
  const result = await incrementDocViews(db, id);

  return {
    props: {
      doc: doc,
    },
  };
}

export default DocumentPage;
