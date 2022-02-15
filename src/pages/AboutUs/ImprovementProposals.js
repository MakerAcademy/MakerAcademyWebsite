import {
  AppBar,
  Box,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const improvementProposals = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState();
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectedRows = (rowIds = []) => {
    // const selectedIDs = new Set(rowIds);
    if (!selectedRows?.length) setTabValue(0);
    setSelectedRows(rowIds);
  };

  return (
    <Stack alignItems="center" spacing={4}>
      <Typography sx={{ fontWeight: 600 }}>Improvement Proposals</Typography>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20, 50]}
          checkboxSelection
          onSelectionModelChange={handleSelectedRows}
        />
      </div>

      {selectedRows?.length > 0 && (
        <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
          <AppBar position="static">
            <Tabs
              value={tabValue}
              onChange={(e, v) => setTabValue(v)}
              indicatorColor="secondary"
              textColor="inherit"
            >
              {selectedRows?.map((row, i) => (
                <Tab label={row} value={i} />
              ))}
            </Tabs>
          </AppBar>

          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={tabValue}
            onChangeIndex={(i) => setTabValue(i)}
          >
            <TabPanel value={tabValue} index={0} dir={theme.direction}>
              Item One
            </TabPanel>
            <TabPanel value={tabValue} index={1} dir={theme.direction}>
              Item Two
            </TabPanel>
            <TabPanel value={tabValue} index={2} dir={theme.direction}>
              Item Three
            </TabPanel>
          </SwipeableViews>
        </Box>
      )}
    </Stack>
  );
};

export default improvementProposals;
