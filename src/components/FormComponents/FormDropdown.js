import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const FormDropdown = ({ name, control, label, options = [] }) => {
  return (
    <FormControl size={"small"}>
      <InputLabel>{label}</InputLabel>
      <Controller
        render={({ field: { onChange, value } }) => (
          <Select onChange={onChange} value={value}>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
        control={control}
        name={name}
      />
    </FormControl>
  );
};

export default FormDropdown;
