import AssessmentBuilder from "@components/AssessmentBuilder";
import RoundedButton from "@components/buttons/RoundedButton";
import FormFieldArray from "@components/FormComponents/FormFieldArray";
import FormSelectField from "@components/FormComponents/FormSelectField";
import FormTextField from "@components/FormComponents/FormTextField";
import {
  ASSESSMENT_QUESTION_TYPES,
  CONTENT_DIFFICULTY_LEVELS,
} from "@constants/";
import { yupResolver } from "@hookform/resolvers/yup";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import * as Yup from "yup";

const AssessmentBuilderForm = ({
  handleSubmit: propsHandleSubmit,
  edit,
  values = {},
}) => {
  const [disabled, setDisabled] = useState(false);
  const theme = useTheme();

  const { t } = useTranslation("creator-studio");

  useEffect(() => {}, []);

  // form validation rules
  const validationSchema = Yup.object().shape({
    // title: Yup.string().required("Required"),
    // description: Yup.string().required("Required"),
    // level: Yup.string().required("Required"),
    // topic: Yup.string().required("Required"),
    // subtopic: Yup.string().required("Required"),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: values,
  };

  const { handleSubmit, reset, control, getValues, setValue } =
    useForm(formOptions);

  const _questions = useWatch({ control, name: "questions" }) || [];

  const onSubmit = (data, e) => {
    setDisabled(true);
    propsHandleSubmit?.({ ...data });
  };

  const RenderListItem = (_props) => {
    const { remove, index } = _props;

    return (
      <Paper
        elevation={0}
        sx={{
          backgroundColor: theme.palette.background.grey1,
          width: "100%",
          p: 2,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ width: "100%" }}
          spacing={4}
          alignItems="flex-start"
        >
          <Stack spacing={2} sx={{ width: "100%" }}>
            <FormTextField
              name={`questions[${index}].question`}
              label="Question"
              control={control}
              fullWidth
              disabled={disabled}
            />

            <FormSelectField
              name={`questions[${index}].type`}
              label="Question Type"
              control={control}
              fullWidth
              disabled={disabled}
              options={ASSESSMENT_QUESTION_TYPES}
            />

            <AssessmentBuilder
              control={control}
              type={_questions[index]?.type}
              name={`questions[${index}]`}
            />
          </Stack>

          <IconButton onClick={() => remove(index)} size="small">
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Paper>
    );
  };

  const RenderHeader = ({ append }) => {
    return (
      <Stack direction={{ xs: "column", md: "row" }}>
        <Typography variant="h6" sx={{ flex: 1 }}>
          {t("questions")}
        </Typography>

        <Button onClick={() => append({ type: "boolean" })}>
          {t("add_question")}
        </Button>
      </Stack>
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <FormTextField
            name="title"
            label="Title"
            control={control}
            fullWidth
            disabled={disabled}
          />

          <FormTextField
            name="description"
            label="Description"
            control={control}
            fullWidth
            multiline
            rows={5}
            disabled={disabled}
          />

          <Stack direction="row" spacing={2}>
            {/* <FormTextField
              name="level"
              label="Level"
              control={control}
              fullWidth
              disabled={disabled}
            /> */}

            <FormSelectField
              name="level"
              label="Level"
              control={control}
              fullWidth
              disabled={disabled}
              options={CONTENT_DIFFICULTY_LEVELS}
            />

            <FormTextField
              name="topic"
              label="Topic"
              control={control}
              fullWidth
              disabled={disabled}
            />

            <FormTextField
              name="subtopic"
              label="Sub-topic"
              control={control}
              fullWidth
              disabled={disabled}
            />
          </Stack>

          <FormFieldArray
            // list
            // enableDragAndDrop
            Elements={RenderListItem}
            control={control}
            name="questions"
            RenderHeader={RenderHeader}
          />

          <Stack alignItems="flex-end">
            <RoundedButton type="submit" disabled={disabled}>
              {edit ? t("edit_assessment") : t("create_new_assessment")}
            </RoundedButton>
          </Stack>
        </Stack>
      </form>
    </>
  );
};

export default AssessmentBuilderForm;
