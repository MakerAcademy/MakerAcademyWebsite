import StudioEditsCarousel from "@components/carousels/StudioEditsCarousel";
import { Box, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { buildRows, columns } from "@pages/Studio/helperFunctions";
import React, { useEffect, useState } from "react";

const fetchUserDocs = async (uid, callback) => {
  const url = `/api/documents?uid=${uid}`;

  const res = await fetch(url, {
    method: "GET",
  });
  const jsonData = await res.json();

  callback?.(jsonData?.message || []);
};

const Content = ({ user }) => {
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if (user._id) {
      fetchUserDocs(user._id, setData);
    }
  }, []);

  console.log(data);

  return (
    <Box>
      {/* Top Part */}
      <Paper sx={{ mb: 2, p: 2 }}>
        <Typography sx={{ mb: 2 }}>Edit Requests</Typography>

        <Box>
          <StudioEditsCarousel
            requests={Array(10)
              .fill()
              .map((_, i) => ({
                _id: i,
                document_title: `Document title ${i}`,
                title: `Grammer fix ${i}`,
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut odio temporibus voluptas error distinctio hic quae corrupti vero doloribus optio! Inventore ex quaerat modi blanditiis soluta maiores illum, ab velit.",
                image:
                  "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
              }))}
          />
        </Box>
      </Paper>

      {/* Bottom Part */}
      <Box sx={{ width: "100%", minHeight: 400 }}>
        <DataGrid
          autoHeight
          rowHeight={70}
          rows={buildRows(data)}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(i) => setPageSize(i)}
          rowsPerPageOptions={[5, 10, 20, 50]}
        />
      </Box>
    </Box>
  );
};

export default Content;
