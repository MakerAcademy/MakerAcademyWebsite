import React from "react";
import FormTextField from "./FormTextField";

const FormAssessment = ({ control, type }) => {
  switch (type) {
    case "boolean":
      return <>Boolean</>;

    case "text":
      return <>Text</>;

    default:
      return <>Type</>;
  }
};

export default FormAssessment;
