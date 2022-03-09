import RoundedButton from "@components/buttons/RoundedButton";
import { Avatar, Box, Stack } from "@mui/material";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

// ----- Users -----
export const columns = [
  {
    field: "thumbnail",
    headerName: "",
    align: "center",
    width: 100,
    renderCell: (params) => {
      return <Avatar />;
    },
  },
  // { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 250 },
  {
    field: "email",
    headerName: "Email",
    // type: "date",
    width: 150,
  },
  {
    field: "email",
    headerName: "Email",
    // type: "date",
    width: 250,
  },
  { field: "user_role", headerName: "User Role", width: 200 },
  { field: "added", headerName: "Added", width: 200 },
  {
    field: "actions",
    headerName: "Actions",
    width: 300,
    renderCell: (params) => (
      <Stack direction="row" alignItems="center" spacing={1}>
        {/* <RoundedButton
          size="small"
          variant="outlined"
          href={`/studio/edit/${params.id}`}
          icon={<EditIcon sx={{ fontSize: 16 }} />}
        >
          Edit
        </RoundedButton> */}

        <RoundedButton
          size="small"
          // href={`/account/profile/${params.id}`}
          icon={<OpenInNewIcon sx={{ fontSize: 16 }} />}
        >
          Open
        </RoundedButton>
      </Stack>
    ),
  },
];

export const statuses = ["Admin", "MA Team", "User"];

export const rows = Array(20)
  .fill()
  .map((_, i) => ({
    id: i,
    name: `Name ${i}`,
    email: "test@123.com",
    added: moment().format("LLL"),
    user_role: statuses[Math.floor(Math.random() * statuses.length)],
  }));

// ----- PUBLISHED -----
export const buildPublishedColumns = (t) => {
  return [
    //   { field: "id", headerName: "ID", width: 70 },
    {
      field: "thumbnail",
      headerName: t("thumbnail"),
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
    { field: "title", headerName: t("title"), width: 300 },
    {
      field: "date",
      headerName: t("date"),
      // type: "date",
      width: 200,
    },
    {
      field: "visibility",
      headerName: t("visibility"),
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "views",
      headerName: t("views"),
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "likes",
      headerName: t("likes"),
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: t("actions"),
      width: 300,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <RoundedButton
            size="small"
            variant="outlined"
            href={`/studio/edit/${params.id}`}
            icon={<EditIcon sx={{ fontSize: 16 }} />}
          >
            {t("edit")}
          </RoundedButton>

          <RoundedButton
            size="small"
            href={`/document/${params.id}`}
            icon={<OpenInNewIcon sx={{ fontSize: 16 }} />}
          >
            {t("open")}
          </RoundedButton>
        </Stack>
      ),
    },
  ];
};

export const buildPublishedRows = (data, t) => {
  return data.map((item, i) => ({
    id: item._id,
    count: i,
    thumbnail: item.thumbnail,
    title: item.title,
    date: moment(item.timestamp).format("lll"),
    visibility: item.status,
    views: item.views,
    likes: item.likes?.length || 0,
  }));
};
