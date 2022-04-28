import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const FormSelectField = ({
  name,
  control,
  sx = {},
  options = [],
  variant = "outlined",
  label,
  fullWidth = true,
  ...props
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ...field }, fieldState: { error }, formState }) => (
        <FormControl
          fullWidth={fullWidth}
          size="small"
          sx={{
            height: "auto",
            ".MuiInputBase-root": {
              minHeight: 45,
              height: "100%",
              borderRadius: "8px",
              // fontSize: 14,
              fontWeight: 300,
            },
            ...sx,
          }}
          variant={variant}
        >
          <InputLabel id="select-field">{label}</InputLabel>
          <Select
            id="select-field"
            // helperText={error ? error.message : null}
            error={!!error}
            label={label}
            {...props}
            {...field}
          >
            {options?.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
};

export default FormSelectField;
