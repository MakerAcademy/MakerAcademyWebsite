import CreatorCounter from "@components/cards/CreatorCounter";
import { Box, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { columns, rows } from "@pages/AboutUs/dummyData";
import React from "react";

const Analytics = () => {
  return <Typography variant="h5">Coming Soon ...</Typography>;

  return (
    <Box>
      <Stack spacing={{ xs: 3, md: 5, lg: 7 }} sx={{ width: "100%" }}>
        {/* Stats */}
        <Box>
          <Grid container spacing={{ xs: 3, md: 5 }}>
            <Grid item xs={12} sm={6} lg={3}>
              <CreatorCounter count={74} text="TOTAL COURSES" />
            </Grid>

            <Grid item xs={12} sm={6} lg={3}>
              <CreatorCounter count={977} text="TOTAL FOLLOWERS" />
            </Grid>

            <Grid item xs={12} sm={6} lg={3}>
              <CreatorCounter count={59} text="DOWNLOADS" />
            </Grid>

            <Grid item xs={12} sm={6} lg={3}>
              <CreatorCounter count={59} text="ANOTHER" />
            </Grid>
          </Grid>
        </Box>

        {/* Charts */}
        <Box>
          <Grid container spacing={{ xs: 3, md: 5 }}>
            <Grid item xs={12} md={5} lg={4}>
              <Paper sx={{ height: 400, width: "100%", p: 3 }}>
                Total Earnings
              </Paper>
            </Grid>
            <Grid item xs={12} md={7} lg={8}>
              <Paper sx={{ height: 400, width: "100%", p: 3 }}>
                Earnings Chart
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
};

export default Analytics;
