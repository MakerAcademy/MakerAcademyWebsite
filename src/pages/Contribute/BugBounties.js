import ContentCardMin from "@components/cards/ContentCardMin";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { columns, rows } from "./dummyData";

const BugBounties = () => {
  const [pageSize, setPageSize] = useState(5);

  return (
    <Box>
      <Grid container spacing={{ xs: 3, md: 5 }} sx={{ mb: { xs: 3, md: 5 } }}>
        {/* Bug Bounty Description */}
        <Grid item xs={12} md={6}>
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

        {/* DAI Bounty Payout History */}
        <Grid item xs={12} md={6}>
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

      {/* Relevant Coursework */}
      <Paper sx={{ height: "100%" }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Relevant Coursework
          </Typography>

          <Stack direction="row" spacing={3}>
            <ContentCardMin />
            <ContentCardMin />
          </Stack>
        </CardContent>
      </Paper>
    </Box>
  );
};

export default BugBounties;
