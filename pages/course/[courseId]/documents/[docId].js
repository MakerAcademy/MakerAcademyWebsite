import CourseDocument from "@components/documents/CourseDocument";
import React from "react";
import { connectToDB } from "../../../../lib/db/connect";
import { getOneDocument } from "../../../../lib/db/document";
import BasicDocument from "@components/documents/BasicDocument";



const DocumentPage = ({doc}) => {
  return (
    <div>
      <BasicDocument data={doc} />
    </div>
  );
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
