import FormFieldArray from "@components/FormComponents/FormFieldArray";
import FormTextField from "@components/FormComponents/FormTextField";
import React from "react";

const MultipleChoice = ({ control, name, ...other }) => {
  return (
    <div>
      <FormFieldArray
        Elements={({ remove, index }) => (
          <FormTextField
            control={control}
            name={`${name}.option${index}`}
            placeholder={`Option ${index + 1}`}
          />
        )}
        control={control}
        {...other}
      />
    </div>
  );
};

export default MultipleChoice;
