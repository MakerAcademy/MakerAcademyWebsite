import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { rows, columns } from "./dummyData";

const Users = () => {
  const [pageSize, setPageSize] = useState(50);

  return (
    <div>
      <Typography variant="h6" sx={{ mb: 3 }}>
        All Users
      </Typography>

      <Box>
        <DataGrid
          rows={rows}
          columns={columns}
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
