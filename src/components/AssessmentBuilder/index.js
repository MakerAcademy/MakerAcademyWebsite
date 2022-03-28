import React from "react";
import File from "./File";
import MultipleChoice from "./MultipleChoice";
import Text from "./Text";

const AssessmentBuilder = ({ type, ...props }) => {
  switch (type) {
    case "multiple_choice":
      return <MultipleChoice {...props} />;

    case "text":
      return <Text {...props} />;

    case "file":
      return <File {...props} />;

    default:
      return <>Type</>;
  }
};

export default AssessmentBuilder;
