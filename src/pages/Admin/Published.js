import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { buildPublishedColumns, buildPublishedRows } from "./dummyData";

const Published = () => {
  const [pageSize, setPageSize] = useState(10);

  const { t } = useTranslation("admin");

  return (
    <div>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Published Documents
      </Typography>

      <Box>
        <DataGrid
          rows={buildPublishedRows([], t)}
          columns={buildPublishedColumns(t)}
          pageSize={pageSize}
          autoHeight
          onPageSizeChange={(i) => setPageSize(i)}
          rowsPerPageOptions={[10, 20, 50]}
          checkboxSelection
          // onSelectionModelChange={handleselectedIds}
        />
      </Box>
    </div>
  );
};

export default Published;
