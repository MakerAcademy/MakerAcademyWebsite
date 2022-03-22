import React from "react";
import clientPromise from "../../../../lib/db/connect";
import BasicDocument from "@components/documents/BasicDocument";
import { getOneCourse } from "lib/db/course";

const DocumentPage = ({ doc }) => {
  console.log(doc);
  return (
    <div>
      <BasicDocument data={doc} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const id = context.params.courseId;
  const docId = context.params.docId;

  if (!id) {
    return {
      props: {
        doc: {},
      },
    };
  }

  const client = await clientPromise;
  const db = client.db();
  const course = await getOneCourse(db, id);

  const doc = course?.docs?.find?.((i) => i._id === docId) || {};

  return {
    props: {
      doc,
    },
  };
}

export default DocumentPage;
