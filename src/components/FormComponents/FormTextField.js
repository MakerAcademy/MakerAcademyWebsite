import { TextField, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

import React from "react";
import { Controller } from "react-hook-form";

const FormTextField = ({
  name,
  control,
  multiline,
  sx = {},
  variant = "outlined",
  label,
  ...props
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ...field }, fieldState: { error }, formState }) => (
        <TextField
          // helperText={error ? error.message : null}
          size="small"
          error={!!error}
          fullWidth
          variant={variant}
          label={label}
          multiline={multiline}
          InputProps={{
            sx: {
              borderRadius: "8px",
              py: multiline ? 1.5 : 0.5,
              px: multiline ? 2.5 : 1,
              ".MuiInputBase-input": {
                fontSize: 14,
                fontWeight: 300,
              },
            },
          }}
          sx={{
            ".MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: isDark ? grey[300] : grey[600],
              color: isDark ? grey[300] : grey[600],
            },
            ...sx,
          }}
          {...props}
          {...field}
        />
      )}
    />
  );
};

export default FormTextField;
