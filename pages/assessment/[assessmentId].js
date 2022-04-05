import AssessmentForm from "@components/forms/AssessmentForm";
import { withProtectedUser } from "@hoc/routes";
import { Container } from "@mui/material";
import { getOneAssessment } from "lib/db/assessment";
import clientPromise from "lib/db/connect";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Assessment = ({ assessment, user }) => {
  const [data, setData] = useState(assessment);

  console.log(assessment)

  const { query } = useRouter();

  const assessmentId = query.assessmentId;

  const handleSubmit = async (data) => {
    const res = await fetch(`/api/assessments?submitAssessment=true`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        ...data,
        author: user._id,
        assessment: assessmentId,
      }),
    }).then((response) => {
      console.log("Client: ", response);
      return response;
    });
    // .then(() => {
    //   setSubmitted({
    //     type: "success",
    //     message: "Successfully submitted edit! Redirecting to studio...",
    //   });
    // });
  };

  return (
    <Container sx={{ py: 5 }}>
      <AssessmentForm questions={data?.questions} handleSubmit={handleSubmit} />
    </Container>
  );
};

export default Assessment;

export const getServerSideProps = withProtectedUser(async (context, user) => {
  const client = await clientPromise;
  const db = client.db();
  const assessment = await getOneAssessment(db, context.params.assessmentId);

  if (!assessment) return { props: {} };

  return {
    props: {
      user,
      assessment: assessment,
    },
  };
});
