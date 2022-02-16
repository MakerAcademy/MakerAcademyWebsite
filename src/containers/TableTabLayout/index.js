import TabPanel from "@components/TabPanel";
import { AppBar, Box, Stack, Tab, Tabs } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";

const TableTabsLayout = ({
  rows = [],
  columns = [],
  selectedIdsChange,
  tabTitle,
  TabPanelChildren,
  sx = {},
  tableContainerSx = {},
  tableProps = {},
  tabsContainerSx = {},
  tabsContainerProps = {},
  tabsSx = {},
  tabsProps = {},
  tabSx = {},
  tabProps = {},
  appBarSx = {},
  appBarProps = {},
}) => {
  const [tabValue, setTabValue] = useState();
  const [selectedIds, setSelectedIds] = useState([]);
  const [pageSize, setPageSize] = useState(5);

  const handleselectedIds = (rowIds = []) => {
    if (!selectedIds?.length) setTabValue(0);
    setSelectedIds(rowIds);
  };

  useEffect(() => {
    selectedIdsChange?.(selectedIds);
  }, [selectedIds]);

  return (
    <Stack alignItems="center" spacing={4} sx={{ ...sx }}>
      <Box sx={{ height: 400, width: "100%", ...tableContainerSx }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(i) => setPageSize(i)}
          rowsPerPageOptions={[5, 10, 20, 50]}
          checkboxSelection
          onSelectionModelChange={handleselectedIds}
          {...tableProps}
        />
      </Box>

      {selectedIds?.length > 0 && (
        <Box
          sx={{
            bgcolor: "background.paper",
            width: "100%",
            ...tabsContainerSx,
          }}
          {...tabsContainerProps}
        >
          <AppBar position="static" sx={{ ...appBarSx }} {...appBarProps}>
            <Tabs
              value={tabValue}
              onChange={(e, v) => setTabValue(v)}
              indicatorColor="secondary"
              textColor="inherit"
              variant="scrollable"
              scrollButtons="auto"
              sx={{ ...tabsSx }}
              {...tabsProps}
            >
              {selectedIds?.map((row, i) => (
                <Tab
                  label={tabTitle?.(row) || row}
                  value={i}
                  key={i}
                  sx={{ textTransform: "inherit", ...tabSx }}
                  {...tabProps}
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
                {TabPanelChildren ? TabPanelChildren : rows[row].title}
              </TabPanel>
            ))}
          </SwipeableViews>
        </Box>
      )}
    </Stack>
  );
};

export default TableTabsLayout;
