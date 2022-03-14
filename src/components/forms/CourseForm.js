import RoundedButton from "@components/buttons/RoundedButton";
import FormDraftField from "@components/FormComponents/FormDraft";
import FormTextField from "@components/FormComponents/FormTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Stack } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const CourseForm = ({ handleSubmit: propsHandleSubmit, edit, values = {} }) => {
  const [disabled, setDisabled] = useState(false);

  // form validation rules
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    level: Yup.string().required("Required"),
    topic: Yup.string().required("Required"),
    subtopic: Yup.string().required("Required"),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: values,
  };

  const { handleSubmit, reset, control, getValues, setValue } =
    useForm(formOptions);

  const onSubmit = (data, e) => {
    setDisabled(true);
    propsHandleSubmit({ ...data });
  };

  const handleDraftChange = ({ editor, markdown, html }) => {
    setValue("markdownValue", markdown);
  };

  const FormFieldArrayElements = ({ index, remove }) => {
    return (
      <Stack direction="row" spacing={2} alignItems="center">
        <FormTextField
          name={`courses[${index}].title`}
          label="Title"
          control={control}
          fullWidth
          disabled={disabled}
        />

        <FormTextField
          name={`courses[${index}].video_url`}
          label="Video Url"
          control={control}
          fullWidth
          disabled={disabled}
        />

        <Button onClick={() => remove(index)}>Remove</Button>
      </Stack>
    );
  };

  return (
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
          <FormTextField
            name="level"
            label="Level"
            control={control}
            fullWidth
            disabled={disabled}
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

        <FormDraftField
          onChange={handleDraftChange}
          handeSubmit={handleSubmit}
          hideHtml
          direction="row"
          value={values?.markdown}
        />

        {/* Example of using field arrays */}
        {/* <FormFieldArray
          control={control}
          label="Courses"
          name="courses"
          Elements={FormFieldArrayElements}
        /> */}

        <Stack alignItems="flex-end">
          <RoundedButton type="submit" disabled={disabled}>
            {edit ? "Edit Document" : "Create New Document"}
          </RoundedButton>
        </Stack>
      </Stack>
    </form>
  );
};

export default CourseForm;
