import RoundedButton from "@components/buttons/RoundedButton";
import FormCheckbox from "@components/FormComponents/FormCheckbox";
import FormRadioGroup from "@components/FormComponents/FormRadioGroup";
import FormTextField from "@components/FormComponents/FormTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack, Typography } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const AssessmentForm = ({
  handleSubmit: propsHandleSubmit,
  edit,
  values = {},
  questions = [],
}) => {
  const [disabled, setDisabled] = useState(false);

  const { t } = useTranslation("creator-studio");

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

  const onSubmit = (data, e) => {
    setDisabled(true);
    propsHandleSubmit?.({ ...data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {questions.map((qn, i) => {
          const Question = () => (
            <Typography sx={{ fontWeight: 500 }}>
              {i + 1}. {qn.question}
            </Typography>
          );

          switch (qn.type) {
            case "text":
              return (
                <React.Fragment key={i}>
                  <Question />
                  <FormTextField
                    name={`answers.${i}`}
                    control={control}
                    fullWidth
                    disabled={disabled}
                  />
                </React.Fragment>
              );

            case "radio":
              return (
                <React.Fragment key={i}>
                  <Question />
                  <FormRadioGroup
                    name={`answers.${i}`}
                    options={qn.options}
                    control={control}
                    disabled={disabled}
                  />
                </React.Fragment>
              );

            case "checkbox":
              return (
                <React.Fragment key={i}>
                  <Question />
                  <FormCheckbox
                    name={`answers.${i}`}
                    options={qn.options}
                    control={control}
                    disabled={disabled}
                  />
                </React.Fragment>
              );

            default:
              break;
          }
        })}

        <Stack alignItems="flex-end">
          <RoundedButton type="submit" disabled={disabled}>
            {edit ? t("edit_assessment") : t("submit_assessment")}
          </RoundedButton>
        </Stack>
      </Stack>
    </form>
  );
};

export default AssessmentForm;
