import React from "react";
import FormTextField from "./FormTextField";
import FormRadioGroup from "./FormRadioGroup";
import FormDropzone from "./FormDropzone";
import FormFieldArray from "./FormFieldArray";

const FormAssessment = ({ type, control, name, ...other }) => {
  switch (type) {
    case "multiple_choice":
      return (
        <FormFieldArray
          Elements={({ remove, index }) => (
            <FormTextField control={control} name={`${name}.option${index}`} />
          )}
          control={control}
          {...other}
        />
      );

    case "text":
      return <FormTextField control={control} {...other} />;

    case "file":
      return <FormDropzone control={control} {...other} />;

    default:
      return <>Type</>;
  }
};

export default FormAssessment;
