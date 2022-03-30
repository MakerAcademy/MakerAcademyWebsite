import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  useTheme,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const FormCheckbox = ({
  name,
  control,
  sx = {},
  options = [],
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
        <FormControl
          fullWidth
          size="small"
          sx={{
            ...sx,
          }}
          variant={variant}
        >
          <FormLabel component="legend">{label}</FormLabel>
          <FormGroup {...props} {...field}>
            {options?.map((item, i) => (
              <FormControlLabel key={i} control={<Checkbox />} label={item} />
            ))}
          </FormGroup>
        </FormControl>
      )}
    />
  );
};

export default FormCheckbox;
