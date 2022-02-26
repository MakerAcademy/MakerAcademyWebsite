import StudioEditsCarousel from "@components/carousels/StudioEditsCarousel";
import { Box, Container, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { columns, rows } from "@pages/AboutUs/dummyData";
import React from "react";

const Content = () => {
  return (
    <Box>
      {/* Top Part */}
      <Paper sx={{ mb: 2, p: 2 }}>
        <Typography sx={{ mb: 2 }}>Edit Requests</Typography>

        <Box>
          <StudioEditsCarousel requests={[...Array(10).fill()]} />
        </Box>
      </Paper>

      {/* Bottom Part */}
      <Box sx={{ width: "100%", minHeight: 400 }}>
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          pageSize={10}
          onPageSizeChange={(i) => setPageSize(i)}
          rowsPerPageOptions={[5, 10, 20, 50]}
          checkboxSelection
          // onSelectionModelChange={handleselectedIds}
        />
      </Box>
    </Box>
  );
};

export default Content;
