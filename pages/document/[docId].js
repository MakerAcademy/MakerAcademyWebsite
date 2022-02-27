import BasicDocument from "@components/documents/BasicDocument";
import React from "react";
import { connectToDB } from "../../lib/db/connect";
import { getOneDocument } from "../../lib/db/document";

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
  console.log(context.params);
  const doc = await getOneDocument(db, context.params.docId);
  console.log(doc);
  return {
    props: {
      doc: doc,
    },
  };
}

export default DocumentPage;
