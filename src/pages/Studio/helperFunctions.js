import RoundedButton from "@components/buttons/RoundedButton";
import { Box, Stack } from "@mui/material";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export const buildColumns = (t) => {
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
    { field: "title", headerName: t("title"), width: 180 },
    {
      field: "date",
      headerName: t("date"),
      // type: "date",
      width: 200,
    },
    {
      field: "contentType",
      headerName: t("content_type"),
      width: 150,
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
            href={`/studio/edit/${params.row.contentType}/${params.id}`}
            icon={<EditIcon sx={{ fontSize: 16 }} />}
          >
            {t("edit")}
          </RoundedButton>

          <RoundedButton
            size="small"
            href={
              params.row.contentType === "courses"
                ? `/course/${params.id}`
                : `/document/${params.id}`
            }
            icon={<OpenInNewIcon sx={{ fontSize: 16 }} />}
          >
            {t("open")}
          </RoundedButton>
        </Stack>
      ),
    },
  ];
};

export const buildRows = (data, t) => {
  return data.map((item, i) => ({
    id: item._id,
    count: i,
    thumbnail: item.thumbnail,
    contentType: t(item.contentType),
    title: item.title,
    date: moment(item.timestamp).format("lll"),
    visibility: item.status,
    views: item.views,
    likes: item.likes?.length || 0,
  }));
};
