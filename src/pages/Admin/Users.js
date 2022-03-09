import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import {
  buildUserColumns,
  buildUserRows,
  fetchUserDocs,
} from "./helperFunctions";

const Users = () => {
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(50);

  const { t } = useTranslation("admin");

  useEffect(() => {
    fetchUserDocs(setData);
  }, []);

  return (
    <div>
      <Typography variant="h6" sx={{ mb: 3 }}>
        All Users
      </Typography>

      <Box>
        <DataGrid
          rows={buildUserRows(data, t)}
          columns={buildUserColumns(t)}
          pageSize={pageSize}
          autoHeight
          onPageSizeChange={(i) => setPageSize(i)}
          rowsPerPageOptions={[20, 50, 100]}
          checkboxSelection
          // onSelectionModelChange={handleselectedIds}
        />
      </Box>
    </div>
  );
};

export default Users;
