import TabPanel from "@components/TabPanel";
import { AppBar, Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { rows, columns } from "./dummyData";

const StatusUpdates = () => {
  const [tabValue, setTabValue] = useState();
  const [selectedIds, setSelectedIds] = useState([]);
  const [pageSize, setPageSize] = useState(5);

  const handleselectedIds = (rowIds = []) => {
    // const selectedIDs = new Set(rowIds);
    if (!selectedIds?.length) setTabValue(0);
    setSelectedIds(rowIds);
  };

  return (
    <Stack alignItems="center" spacing={4}>
      <Typography sx={{ fontWeight: 600 }}>Status Updates</Typography>

      <Box style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(i) => setPageSize(i)}
          rowsPerPageOptions={[5, 10, 20, 50]}
          checkboxSelection
          onSelectionModelChange={handleselectedIds}
        />
      </Box>

      {selectedIds?.length > 0 && (
        <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
          <AppBar position="static">
            <Tabs
              value={tabValue}
              onChange={(e, v) => setTabValue(v)}
              indicatorColor="secondary"
              textColor="inherit"
              variant="scrollable"
              scrollButtons="auto"
            >
              {selectedIds?.map((row, i) => (
                <Tab
                  label={`Proposal #${row}`}
                  value={i}
                  key={i}
                  sx={{ textTransform: "inherit" }}
                />
              ))}
            </Tabs>
          </AppBar>

          <SwipeableViews
            index={tabValue}
            onChangeIndex={(i) => setTabValue(i)}
          >
            {selectedIds?.map((row, i) => (
              <TabPanel key={i} value={tabValue} index={i}>
                {rows[row].title}
              </TabPanel>
            ))}
          </SwipeableViews>
        </Box>
      )}
    </Stack>
  );
};

export default StatusUpdates;
