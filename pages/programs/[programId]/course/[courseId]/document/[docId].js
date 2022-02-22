import BasicDocument from "@components/documents/BasicDocument";
import React from "react";
import { connectToDB } from "../../../../../../lib/db/connect";
import { getOneDocument } from "../../../../../../lib/db/document";


const DocumentPage = ({doc}) => {
  return <BasicDocument data={doc} />;
};

export async function getServerSideProps(context) {
  const {db} = await connectToDB();
  const doc = await getOneDocument(db, context.params.docId);
  return {
    props: {
      doc: doc
    }
  }
}

export default DocumentPage;
