import BasicDocument from "@components/documents/BasicDocument";
import PageNotFound from "@components/errors/PageNotFound";
import React from "react";
import clientPromise from "../../lib/db/connect";
import { getOneDocument, incrementDocViews } from "../../lib/db/document";

const DocumentPage = (props) => {
  const { doc = {} } = props;

  if (!doc) return <PageNotFound title={"document"} />;

  return (
    <div>
      <BasicDocument data={doc} />
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    const id = context.params.docId;

    const client = await clientPromise;
    const db = client.db();
    const doc = await getOneDocument(db, id);
    const result = await incrementDocViews(db, id);

    return {
      props: {
        doc: doc,
      },
    };
  } catch (error) {
    console.log(error);
  }

  return { props: {} };
}

export default DocumentPage;
