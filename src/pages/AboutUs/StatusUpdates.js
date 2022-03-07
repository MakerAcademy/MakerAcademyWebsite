import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import TableTabsLayout from "src/containers/TableTabLayout";
import { columns, rows } from "./dummyData";

const StatusUpdates = () => {
  return <div>Coming Soon</div>;
  return (
    <Stack alignItems="center" spacing={4}>
      <Typography sx={{ fontWeight: 600 }}>Status Updates</Typography>

      <Box sx={{ width: "100%" }}>
        <TableTabsLayout rows={rows} columns={columns} />
      </Box>
    </Stack>
  );
};

export default StatusUpdates;
