import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const FormTextField = ({ name, control, multiline, sx = {}, ...other }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          fullWidth
          variant="outlined"
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
          {...other}
        />
      )}
    />
  );
};

export default FormTextField;
