// Data tables
export const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "title", headerName: "Title", width: 300 },
  {
    field: "date",
    headerName: "Date",
    // type: "date",
    width: 150,
  },
  { field: "status", headerName: "Status", width: 160 },
  { field: "comments", headerName: "Comments", width: 300 },
];

export const statuses = ["Rejected", "Implemented", "In Progress", "Submitted"];

export const rows = Array(20)
  .fill()
  .map((_, i) => ({
    id: i,
    title: `A title ${i}`,
    date: "01/25/22",
    status: statuses[Math.floor(Math.random() * statuses.length)],
    comments: "",
  }));
