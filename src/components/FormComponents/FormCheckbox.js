import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
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
  disabled,
  required,
  ...props
}) => {
  return (
    <FormControl
      fullWidth
      size="small"
      sx={{
        ...sx,
      }}
      variant={variant}
      disabled={disabled}
    >
      <FormLabel>{label}</FormLabel>
      <FormGroup>
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              {options?.map((item, i) => (
                <FormControlLabel
                  key={i}
                  control={<Checkbox required={required && !field.value} />}
                  label={item}
                  {...field}
                  value={item}
                  checked={field?.value?.includes?.(item)}
                  onChange={(event, checked) => {
                    if (checked) {
                      field.onChange([
                        ...(field.value || []),
                        event.target.value,
                      ]);
                    } else {
                      const filtered = field.value.filter(
                        (value) => value !== event.target.value
                      );

                      field.onChange(filtered?.length ? filtered : null);
                    }
                  }}
                />
              ))}

              {error && <FormHelperText error>{error.message}</FormHelperText>}
            </>
          )}
        />
      </FormGroup>

      <FormHelperText error={props.helperText}>
        {props.helperText}
      </FormHelperText>
    </FormControl>
  );
};

export default FormCheckbox;
