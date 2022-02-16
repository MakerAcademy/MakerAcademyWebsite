import ContentCardMin from "@components/cards/ContentCardMin";
import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { columns, rows } from "./dummyData";

const BugBounties = () => {
  const [pageSize, setPageSize] = useState(5);

  return (
    <Box>
      <Grid container spacing={{ xs: 3, md: 5 }}>
        {/* Bug Bounty Description */}
        <Grid item xs={12} md={5} lg={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Bug Bounty Description
              </Typography>

              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit
                amet posuere sem. Curabitur vitae massa lobortis mi finibus
                auctor. Donec ipsum diam, finibus nec quam vel, rutrum interdum
                nisl. Nullam at tellus purus. Vestibulum commodo enim eget lacus
                vestibulum vehicula. Mauris egestas viverra sodales. Aliquam vel
                turpis venenatis, eleifend ante in, rutrum massa.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Relevant Coursework */}
        <Grid item xs={12} md={3} lg={2}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Relevant Coursework
              </Typography>

              <Stack spacing={3}>
                <ContentCardMin />
                <ContentCardMin />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* DAI Bounty Payout History */}
        <Grid item xs={12} md={4} lg={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                DAI Bounty Payout History
              </Typography>

              <Box sx={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={pageSize}
                  onPageSizeChange={(i) => setPageSize(i)}
                  rowsPerPageOptions={[5, 10, 20, 50]}
                  checkboxSelection
                  // onSelectionModelChange={handleselectedIds}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BugBounties;
