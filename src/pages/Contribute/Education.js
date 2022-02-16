import { Box } from "@mui/material";
import React from "react";
import TableTabsLayout from "src/containers/TableTabLayout";
import { rows, columns } from "./dummyData";

const Education = () => {
  return (
    <Box>
      <TableTabsLayout rows={rows} columns={columns} />
    </Box>
  );
};

export default Education;
