import FormTextField from "@components/FormComponents/FormTextField";
import React from "react";

const Text = ({ control, ...other }) => {
  return <FormTextField control={control} {...other} />;
};

export default Text;
