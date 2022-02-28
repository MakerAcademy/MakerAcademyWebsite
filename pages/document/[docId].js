import BasicDocument from "@components/documents/BasicDocument";
import React from "react";
import { connectToDB } from "../../lib/db/connect";
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
  const { db } = await connectToDB();
  const doc = await getOneDocument(db, context.params.docId);
  const result = await incrementDocViews(db, context.params.docId);
  return {
    props: {
      doc: doc,
    },
  };
}

export default DocumentPage;
