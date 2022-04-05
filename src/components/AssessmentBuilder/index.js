import React from "react";
import CheckboxOptions from "./Checkbox";
import File from "./File";
import MultipleChoice from "./MultipleChoice";
import Text from "./Text";

const AssessmentBuilder = ({ type, ...props }) => {
  switch (type) {
    case "radio":
      return <MultipleChoice {...props} />;

    case "checkbox":
      return <CheckboxOptions {...props} />;

    case "text":
      return <Text {...props} />;

    case "file":
      return <File {...props} />;

    default:
      return <></>;
  }
};

export default AssessmentBuilder;
