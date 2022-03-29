import FormFieldArray from "@components/FormComponents/FormFieldArray";
import FormTextField from "@components/FormComponents/FormTextField";
import { Button, Stack, Typography } from "@mui/material";
import React from "react";

const CheckboxOptions = ({ control, name, ...other }) => {
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
    <div>
      <FormFieldArray
        name={name}
        RenderHeader={RenderHeader}
        Elements={({ remove, index }) => (
          <FormTextField
            control={control}
            name={`${name}.${index}`}
            placeholder={`Option ${index + 1}`}
          />
        )}
        control={control}
        {...other}
      />
    </div>
  );
};

export default CheckboxOptions;
