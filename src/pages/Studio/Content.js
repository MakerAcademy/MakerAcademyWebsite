import StudioEditsCarousel from "@components/carousels/StudioEditsCarousel";
import commonProps from "@hoc/commonProps";
import { Box, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { buildRows, columns } from "@pages/Studio/helperFunctions";
// import { connectToDB } from "lib/db/connect";
// import { getUserDocuments } from "lib/db/document";
import React, { useEffect, useState } from "react";

// const fetchData = async (uid) => {
//   const { db } = await connectToDB();
//   const doc = await getUserDocuments(db, uid);

//   return doc;
// };

const Content = ({ user }) => {
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    // if (user._id) fetchData().then(setData);
  }, [user]);

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

export default commonProps(Content);
