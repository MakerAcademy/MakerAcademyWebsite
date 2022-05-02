import RoundedButton from "@components/buttons/RoundedButton";
import FormDraftField from "@components/FormComponents/FormDraft";
import FormSelectField from "@components/FormComponents/FormSelectField";
import FormTextField from "@components/FormComponents/FormTextField";
import { BRAND } from "@constants/";
import { CONTENT_DIFFICULTY_LEVELS } from "@constants/";
import commonProps from "@hoc/commonProps";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const DocumentForm = ({
  handleSubmit: propsHandleSubmit,
  edit,
  values = {},
  user,
}) => {
  const [disabled, setDisabled] = useState(false);

  const { t } = useTranslation("creator-studio");

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

        <FormDraftField
          onChange={handleDraftChange}
          handeSubmit={handleSubmit}
          hideHtml
          direction="row"
          value={values?.markdown}
        />

        <Stack
          justifyContent="flex-end"
          alignItems="flex-end"
          direction="row"
          spacing={2}
        >
          <FormSelectField
            name="brand"
            label="Brand"
            control={control}
            disabled={disabled}
            options={BRAND}
            fullWidth={false}
            sx={{ minWidth: 200 }}
          />

          <RoundedButton type="submit" disabled={disabled}>
            {edit ? t("edit_document") : t("create_new_document")}
          </RoundedButton>
        </Stack>
      </Stack>
    </form>
  );
};

export default commonProps(DocumentForm);
