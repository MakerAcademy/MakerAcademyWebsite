import BackButton from "@components/buttons/BackButton";
import AssessmentBuilderForm from "@components/forms/AssessmentBuilderForm";
import CourseForm from "@components/forms/CourseForm";
import { withProtectedUser } from "@hoc/routes";
import {
  Alert,
  Container,
  Snackbar,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useState } from "react";

const CreatorStudioNew = ({ user }) => {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(null);
  const [type, setType] = useState("document");

  const { t } = useTranslation("creator-studio");

  if (typeof window === "undefined")
    return <Container sx={{ py: 5 }} maxWidth="xl" />;

  const handleDocumentSubmit = async (data) => {
    const { title, description, level, topic, subtopic, markdownValue, brand } =
      data;

    return await fetch("/api/documents", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        title,
        description,
        level,
        topic,
        subtopic,
        brand,
        contentType: "documents",
        duration: 30,
        author: user?._id,
        body: markdownValue,
        thumbnail:
          "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.png",
        status: "published",
      }),
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((response) => {
        const { _id } = response;

        setSubmitted({
          type: "success",
          message:
            "Successfully created document. Redirecting to your studio...",
          _id,
        });
      });
  };

  const handleCourseSubmit = async (data) => {
    const {
      title,
      description,
      level,
      topic,
      subtopic,
      brand,
      documents = [],
    } = data;

    return await fetch("/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        title,
        description,
        level,
        topic,
        subtopic,
        documents,
        brand,
        contentType: "courses",
        duration: 30,
        author: user?._id,
        thumbnail:
          "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.png",
        status: "published",
      }),
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((response) => {
        const { _id } = response;

        setSubmitted({
          type: "success",
          message: "Successfully created course. Redirecting to your studio...",
          _id,
        });
      });
  };

  const handleAssessmentSubmit = async (data) => {
    const { title, description, level, topic, subtopic, questions = [] } = data;

    const _questions = questions?.map(({ answer, ...i }) => ({ ...i }));
    const answers = questions?.map(({ answer }) => answer || false);

    // console.log(_questions, answers);

    return await fetch("/api/assessments", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        title,
        description,
        level,
        topic,
        subtopic,
        questions: _questions,
        answers,
        contentType: "assessments",
        duration: 30,
        author: user?._id,
        thumbnail:
          "https://prod-discovery.edx-cdn.org/media/course/image/0e575a39-da1e-4e33-bb3b-e96cc6ffc58e-8372a9a276c1.png",
        status: "published",
      }),
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((response) => {
        const { _id } = response;

        setSubmitted({
          type: "success",
          message:
            "Successfully created assessment. Redirecting to your studio ...",
          _id,
        });
      });
  };

  const handleTypeChange = (v) => {
    setType(v);
  };

  const handleSnackbarClose = () => {
    if (submitted) {
      const { type, message, _id } = submitted || {};

      // Change route based on the res id we get - `/document/${_id}`
      type === "success" && router.push("/studio/content");

      setSubmitted(null);
    }
  };

  const DocumentForm = dynamic(() => import("@components/forms/DocumentForm"));

  return (
    <Container sx={{ py: 5 }} maxWidth="xl">
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <BackButton />
        <Typography variant="h6">{t("create_new_content")}</Typography>
      </Stack>

      <ToggleButtonGroup
        color="primary"
        value={type}
        exclusive
        onChange={(_, v) => handleTypeChange(v)}
        fullWidth
        sx={{ maxWidth: 450, mb: 3 }}
      >
        <ToggleButton value="document">{t("document")}</ToggleButton>
        <ToggleButton value="course">{t("course")}</ToggleButton>
        <ToggleButton value="assessment">{t("assessment")}</ToggleButton>
      </ToggleButtonGroup>

      {/* Form */}
      {type === "document" && (
        <DocumentForm handleSubmit={handleDocumentSubmit} />
      )}

      {type === "course" && <CourseForm handleSubmit={handleCourseSubmit} />}

      {type === "assessment" && (
        <AssessmentBuilderForm handleSubmit={handleAssessmentSubmit} />
      )}

      {/* Submitted alert */}
      {submitted && (
        <Snackbar
          open={!!submitted}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
        >
          <Alert severity={submitted?.type} sx={{ width: "100%" }}>
            {submitted?.message}
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export const getServerSideProps = withProtectedUser();

export default CreatorStudioNew;
