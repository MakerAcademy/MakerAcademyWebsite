import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const FormRadioGroup = ({
  name,
  control,
  sx = {},
  options = [],
  variant = "standard",
  label,
  disabled,
  required,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl
          fullWidth
          size="small"
          sx={{
            ...sx,
          }}
          variant={variant}
          disabled={disabled}
        >
          <FormLabel id="radio-id">{label}</FormLabel>
          <RadioGroup
            aria-labelledby="radio-id"
            // helperText={error ? error.message : null}
            label={label}
            {...props}
            {...field}
            onChange={(e, v) => {
              field.onChange(v);
            }}
            required
          >
            {options?.map((item, i) => (
              <FormControlLabel
                key={i}
                value={item}
                control={<Radio required={required} />}
                label={item}
              />
            ))}
          </RadioGroup>

          <FormHelperText error={props?.helperText || error?.message}>
            {props?.helperText || error?.message}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default FormRadioGroup;
