import FormFieldArray from "@components/FormComponents/FormFieldArray";
import FormTextField from "@components/FormComponents/FormTextField";
import { Button, Stack, Typography } from "@mui/material";
import React from "react";

const MultipleChoice = ({ control, name, ...other }) => {
  const RenderHeader = ({ append }) => {
    return (
      <Stack direction={{ xs: "column", md: "row" }}>
        <Typography variant="h6" sx={{ flex: 1 }}>
          Options
        </Typography>

        <Button onClick={() => append()}>Add Option</Button>
      </Stack>
    );
  };

  return (
    <Stack spacing={2}>
      <FormTextField
        control={control}
        name={`${name}.answer`}
        label="Correct Answer"
      />

      <FormFieldArray
        name={`${name}.options`}
        RenderHeader={RenderHeader}
        Elements={({ remove, index }) => (
          <FormTextField
            control={control}
            name={`${name}.options.${index}`}
            placeholder={`Option ${index + 1}`}
          />
        )}
        control={control}
        {...other}
      />
    </Stack>
  );
};

export default MultipleChoice;
