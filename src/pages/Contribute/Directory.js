import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { columns, rows } from "./dummyData";

const ContributeDirectory = () => {
  const [pageSize, setPageSize] = useState(5);

  return (
    <Box>
      <Grid container spacing={{ xs: 3, md: 5, lg: 7 }}>
        {/* Table */}
        <Grid item xs={12} md={8} lg={9}>
          <Typography sx={{ mb: 2 }}>
            This is a directory of all Maker Academy users. If you would like to
            search for qualified contributors, you've found the right place!
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
        </Grid>

        {/* Card */}
        <Grid item xs={12} md={4} lg={3}>
          <Card elevation={2} sx={{ mt: { xs: 0, md: 4.5 } }}>
            <CardContent>Card Content here</CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContributeDirectory;
