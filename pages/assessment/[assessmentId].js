import NextPreviousButton from "@components/buttons/NextPreviousButton";
import AssessmentForm from "@components/forms/AssessmentForm";
import { withProtectedUser } from "@hoc/routes";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import { getOneAssessment } from "lib/db/assessment";
import clientPromise from "lib/db/connect";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Assessment = ({ assessment, user, next = {}, previous = {} }) => {
  const [data, setData] = useState(assessment);
  const { title, description, questions } = data || {};

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
      <Stack spacing={3}>
        <Typography variant="h6">{title}</Typography>

        <Typography>{description}</Typography>

        <Divider />

        <Box sx={{ minHeight: "50vh" }}>
          <AssessmentForm questions={questions} handleSubmit={handleSubmit} />
        </Box>

        <NextPreviousButton {...next} {...previous} />
      </Stack>
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
