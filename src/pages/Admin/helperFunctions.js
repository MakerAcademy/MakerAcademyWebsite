import RoundedButton from "@components/buttons/RoundedButton";
import { Avatar, Box, Stack } from "@mui/material";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { TRUST_LEVELS } from "@constants";

// ----- Users -----
export const fetchUserDocs = async (callback) => {
  const url = `/api/users?getAllUsers=true`;

  const res = await fetch(url, {
    method: "GET",
  });
  const jsonData = await res.json();

  callback?.(jsonData.message || []);
};

export const buildUserRows = (data, t) => {
  return data.map((item) => ({
    id: item._id,
    name: item.name,
    email: item.email,
    thumbnail: item.image,
    added: moment().format("LLL"),
    user_role: t(TRUST_LEVELS[item.trustLevel || 1]),
  }));
};

export const buildUserColumns = (t) => {
  return [
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
          <RoundedButton
            size="small"
            href={`/account/${params.id}/profile`}
            icon={<OpenInNewIcon sx={{ fontSize: 16 }} />}
          >
            Open
          </RoundedButton>
        </Stack>
      ),
    },
  ];
};

// ----- PUBLISHED -----
export const fetchPublishedDocs = async (callback) => {
  const url = `/api/documents?getPublishedDocs=true`;

  const res = await fetch(url, {
    method: "GET",
  });
  const jsonData = await res.json();

  callback?.(jsonData.message || []);
};

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
    { field: "title", headerName: t("title"), width: 250 },
    {
      field: "date",
      headerName: t("date"),
      // type: "date",
      width: 180,
    },
    {
      field: "contentType",
      headerName: t("content_type"),
      width: 170,
      align: "center",
      headerAlign: "center",
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
      width: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "likes",
      headerName: t("likes"),
      width: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: t("actions"),
      width: 280,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <RoundedButton
            size="small"
            variant="outlined"
            href={`/studio/edit/${params.row.contentType}/${params.id}`}
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
    contentType: item.contentType,
    title: item.title,
    date: moment(item.timestamp).format("lll"),
    visibility: item.status,
    views: item.views,
    likes: item.likes?.length || 0,
  }));
};

// Pending
export const fetchPendingDocs = async (callback) => {
  const url = `/api/documents?getPendingDocs=true`;

  const res = await fetch(url, {
    method: "GET",
  });
  const jsonData = await res.json();

  callback?.(jsonData.message || []);
};
