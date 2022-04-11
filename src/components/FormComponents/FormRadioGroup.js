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
  ...props
}) => {
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
          disabled={disabled}
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
                control={<Radio error={true} helperText="Hello" />}
                label={item}
              />
            ))}
          </RadioGroup>

          <FormHelperText error={props.helperText || error.message}>
            {props.helperText || error.message}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default FormRadioGroup;
