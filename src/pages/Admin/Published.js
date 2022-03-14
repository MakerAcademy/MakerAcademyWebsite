import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import {
  buildPublishedColumns,
  buildPublishedRows,
  fetchPublishedDocs,
} from "./helperFunctions";

const Published = () => {
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  const { t } = useTranslation("admin");

  useEffect(() => {
    fetchPublishedDocs(setData);
  }, []);

  return (
    <div>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Published Documents
      </Typography>

      <Box>
        <DataGrid
          rows={buildPublishedRows(data, t)}
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
