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

// import { object, string } from "yup";

const AssessmentForm = ({
  handleSubmit: propsHandleSubmit,
  submitted,
  values = {},
  correctAnswers,
  questions = [],
}) => {
  const [disabled, setDisabled] = useState(false);

  const { t } = useTranslation("creator-studio");

  // form validation rules

  // const validationSchema = Yup.object().shape({});
  const _validation = questions?.reduce?.((acc, item, i) => {
    acc[`answer${i}`] =
      item.type === "checkbox"
        ? Yup.array().required("Required")
        : Yup.string().required("Required");
    return acc;
  }, {});

  const validationSchema = Yup.object().shape({ ..._validation });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: values,
  };

  const { handleSubmit, reset, control, getValues, setValue } =
    useForm(formOptions);

  const onSubmit = (data, e) => {
    const _data = Object.values(data);
    setDisabled(true);
    propsHandleSubmit?.(_data);
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

          const _submittedAns = submitted && values?.answers?.[i];
          const _correctAns = submitted && correctAnswers?.[i];

          const _correction = _submittedAns !== _correctAns && _correctAns;

          switch (qn.type) {
            case "text":
              return (
                <React.Fragment key={i}>
                  <Question />
                  <FormTextField
                    name={`answer${i}`}
                    control={control}
                    fullWidth
                    disabled={disabled || submitted}
                    error={_correction}
                    helperText={submitted ? _correction || "Correct" : null}
                    required
                  />
                </React.Fragment>
              );

            case "radio":
              return (
                <React.Fragment key={i}>
                  <Question />
                  <FormRadioGroup
                    name={`answer${i}`}
                    options={qn.options}
                    control={control}
                    disabled={disabled || submitted}
                    error={_correction}
                    helperText={submitted ? _correction || "Correct" : null}
                    required
                  />
                </React.Fragment>
              );

            case "checkbox":
              return (
                <React.Fragment key={i}>
                  <Question />
                  <FormCheckbox
                    name={`answer${i}`}
                    options={qn.options}
                    control={control}
                    disabled={disabled || submitted}
                    error={_correction}
                    helperText={
                      submitted ? _correction?.join?.(", ") || "Correct" : null
                    }
                    required
                  />
                </React.Fragment>
              );

            default:
              break;
          }
        })}

        {!submitted && (
          <Stack alignItems="flex-end">
            <RoundedButton type="submit" disabled={disabled}>
              {t("submit_assessment")}
            </RoundedButton>
          </Stack>
        )}
      </Stack>
    </form>
  );
};

export default AssessmentForm;
