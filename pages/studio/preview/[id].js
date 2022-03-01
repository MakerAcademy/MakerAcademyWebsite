import PreviewDocument from "@components/documents/PreviewDocument";
import React from "react";
import { connectToDB } from "../../../lib/db/connect";
import { getDraft } from "../../../lib/db/document";

const PreviewPage = (props) => {
  const { doc = {} } = props;
  return (
    <div>
      <PreviewDocument data={doc} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const { db } = await connectToDB();
  const doc = await getDraft(db, context.params.id);
  return {
    props: {
      doc: doc,
    },
  };
}

export default PreviewPage;
