import AssessmentForm from "@components/forms/AssessmentForm";
import { Container } from "@mui/material";
import React, { useState } from "react";

const DUMMY_DATA = {
  title: "Assessment Title",
  description: "Assessment Description",
  level: "beginner",
  topic: "Topic",
  subtopic: "Sub-topic",
  questions: [
    {
      type: "text",
      question: "Question 1",
    },
    {
      type: "checkbox",
      question: "Question 2",
      answer: "Sam",
      options: ["Sam", "Zach", "Colby"],
    },
    {
      type: "multiple_choice",
      question: "Question 3",
      answer: "B",
      options: ["A", "B", "C"],
    },
  ],
};

const Assessment = () => {
  const [data, setData] = useState(DUMMY_DATA);

  const handleSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container sx={{ py: 5 }}>
      <AssessmentForm questions={data?.questions} handleSubmit={handleSubmit} />
    </Container>
  );
};

export default Assessment;
