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
    <FormControl
      fullWidth
      size="small"
      sx={{
        ...sx,
      }}
      variant={variant}
    >
      <FormLabel>{label}</FormLabel>
      <FormGroup>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <>
              {options?.map((item, i) => (
                <FormControlLabel
                  key={i}
                  control={<Checkbox />}
                  label={item}
                  {...field}
                  value={item}
                  onChange={(event, checked) => {
                    if (checked) {
                      field.onChange([
                        ...(field.value || []),
                        event.target.value,
                      ]);
                    } else {
                      field.onChange(
                        field.value.filter(
                          (value) => value !== event.target.value
                        )
                      );
                    }
                  }}
                />
              ))}
            </>
          )}
        ></Controller>
      </FormGroup>
    </FormControl>
  );

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
          <FormGroup onChange={(e) => console.log(e.target.value)}>
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
