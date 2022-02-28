import { Box } from "@mui/material";

// Data tables
export const columns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "image",
    headerName: "Image",
    width: 150,
    renderCell: (params) => (
      <Box sx={{ py: 0.5, height: "100%" }}>
        <img
          src={params.value}
          style={{ height: "100%", width: "100%", objectFit: "cover" }}
        />
      </Box>
    ),
  },
  { field: "title", headerName: "Title", width: 300 },
  {
    field: "date",
    headerName: "Date",
    // type: "date",
    width: 150,
  },
  { field: "visibility", headerName: "Visibility", width: 160 },
  { field: "views", headerName: "Views", width: 140 },
  { field: "comments", headerName: "Comments", width: 140 },
];

export const statuses = ["Public", "Private", "Unlisted"];

export const rows = Array(20)
  .fill()
  .map((_, i) => ({
    id: i,
    image:
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    title: `A content title ${i}`,
    date: "01/25/22",
    visibility: statuses[Math.floor(Math.random() * statuses.length)],
    views: "15",
    comments: "2",
  }));
