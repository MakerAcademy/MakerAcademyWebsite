import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  useTheme,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const FormRadioGroup = ({
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
          <FormLabel id="radio-id">{label}</FormLabel>
          <RadioGroup
            aria-labelledby="radio-id"
            // helperText={error ? error.message : null}
            label={label}
            {...props}
            {...field}
          >
            {options?.map((item, i) => (
              <FormControlLabel
                key={i}
                value={item}
                control={<Radio />}
                label={item}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
    />
  );
};

export default FormRadioGroup;
