import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const FormTextField = ({
  name,
  control,
  multiline,
  sx = {},
  variant = "outlined",
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ...field }, fieldState: { error }, formState }) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          fullWidth
          variant={variant}
          multiline={multiline}
          InputProps={{
            sx: {
              borderRadius: "8px",
              fontSize: 14,
              fontWeight: 300,
              py: multiline ? 1.5 : 0.5,
              px: multiline ? 2.5 : 1,
            },
          }}
          sx={{ ...sx }}
          {...props}
          {...field}
        />
      )}
    />
  );
};

export default FormTextField;
