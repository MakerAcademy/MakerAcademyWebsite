import React from "react";
import clientPromise from "../../../../lib/db/connect";
import BasicDocument from "@components/documents/BasicDocument";
import { getOneCourse } from "lib/db/course";
import { useRouter } from "next/router";
import { generateCourseRoutes } from "..";
import { getOneDocument } from "lib/db/document";

const DocumentPage = ({ doc, documents }) => {
  const router = useRouter();
  const {
    query: { courseId, docId },
  } = router;

  const { previousRoute, nextRoute } = generateCourseRoutes(
    courseId,
    docId,
    documents
  );

  return (
    <div>
      <BasicDocument
        data={doc}
        previous={{ previousRoute: previousRoute, previousText: "Previous" }}
        next={{ nextRoute: nextRoute, nextText: "Next" }}
      />
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

  const doc = await getOneDocument(db, docId);

  return {
    props: {
      documents: course.documents,
      doc,
    },
  };
}

export default DocumentPage;
