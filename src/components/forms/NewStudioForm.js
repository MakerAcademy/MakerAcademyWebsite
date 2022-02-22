import RoundedButton from "@components/buttons/RoundedButton";
import FormDraftField from "@components/formComponents/FormDraft";
import FormTextField from "@components/formComponents/FormTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const NewStudioForm = ({ handleSubmit: propsHandleSubmit }) => {
  // form validation rules
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    level: Yup.string().required("Required"),
    topic: Yup.string().required("Required"),
    subtopic: Yup.string().required("Required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { handleSubmit, reset, control, getValues, setValue } =
    useForm(formOptions);

  const onSubmit = (data, e) => {
    propsHandleSubmit({ ...data });
    reset(); // reset after form submit
  };

  const handleDraftChange = ({ editor, markdown, html }) => {
    setValue("markdownValue", markdown);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <FormTextField name="title" label="Title" control={control} fullWidth />

        <FormTextField
          name="description"
          label="Description"
          control={control}
          fullWidth
          multiline
          rows={5}
        />

        <Stack direction="row" spacing={2}>
          <FormTextField
            name="level"
            label="Level"
            control={control}
            fullWidth
          />

          <FormTextField
            name="topic"
            label="Topic"
            control={control}
            fullWidth
          />

          <FormTextField
            name="subtopic"
            label="Sub-topic"
            control={control}
            fullWidth
          />
        </Stack>

        <FormDraftField
          onChange={handleDraftChange}
          handeSubmit={handleSubmit}
          hideHtml
          direction="row"
        />

        <Stack alignItems="flex-end">
          <RoundedButton type="submit">Create New Document</RoundedButton>
        </Stack>
      </Stack>
    </form>
  );
};

export default NewStudioForm;
