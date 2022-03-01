import RoundedButton from "@components/buttons/RoundedButton";
import { Box, Stack } from "@mui/material";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export const columns = [
  //   { field: "id", headerName: "ID", width: 70 },
  {
    field: "thumbnail",
    headerName: "Thumbnail",
    width: 150,
    renderCell: (params) => {
      return (
        <Box sx={{ height: "100%", py: 0.8 }}>
          <img
            src={params.value}
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          />
        </Box>
      );
    },
  },
  { field: "title", headerName: "Title", width: 300 },
  {
    field: "date",
    headerName: "Date",
    // type: "date",
    width: 200,
  },
  {
    field: "visibility",
    headerName: "Visibility",
    width: 150,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "views",
    headerName: "Views",
    width: 150,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "likes",
    headerName: "Likes",
    width: 150,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 300,
    renderCell: (params) => (
      <Stack direction="row" alignItems="center" spacing={1}>
        <RoundedButton
          size="small"
          variant="outlined"
          href={`/studio/edit/${params.id}`}
          icon={<EditIcon sx={{ fontSize: 16 }} />}
        >
          Edit
        </RoundedButton>

        <RoundedButton
          size="small"
          href={`/document/${params.id}`}
          icon={<OpenInNewIcon sx={{ fontSize: 16 }} />}
        >
          Open
        </RoundedButton>
      </Stack>
    ),
  },
];

export const buildRows = (data) => {
  return data.map((item, i) => ({
    id: item._id,
    count: i,
    thumbnail: item.thumbnail,
    title: item.title,
    date: moment(item.timestamp).format("lll"),
    visibility: item.status,
    views: item.views,
    likes: item.likes,
  }));
};
