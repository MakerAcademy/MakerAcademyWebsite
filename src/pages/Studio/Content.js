import StudioEditsCarousel from "@components/carousels/StudioEditsCarousel";
import { Box, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { buildColumns, buildRows } from "@pages/Studio/helperFunctions";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";

const fetchUserDocs = async (uid, callback) => {
  const url = `/api/documents?uid=${uid}`;

  const res = await fetch(url, {
    method: "GET",
  });
  const jsonData = await res.json();

  callback?.(jsonData?.message || []);
};

const fetchEditSubmissions = async (uid, callback) => {
  const url = `/api/documents?getSubmissions=true&uid=${uid}`;

  const res = await fetch(url, {
    method: "GET",
  });
  const jsonData = await res.json();

  const editRequests = jsonData?.message;

  const flattened = editRequests
    .reduce((acc, item) => {
      if (!item.drafts || !item?.doc?.title || !item.published) return acc;

      item.drafts.map((dr) => {
        acc = [
          ...acc,
          {
            ...dr,
            publishedDoc: {
              ...item.doc,
              author: item.author,
              _id: item.published,
            },
          },
        ];
      });

      return acc;
    }, [])
    ?.filter((i) => i.title);

  const sorted = flattened.sort((x, y) => {
    return x.timestamp - y.timestamp;
  });

  callback?.(sorted || []);
};

const Content = ({ user }) => {
  const [data, setData] = useState([]);
  const [editRequests, setEditRequests] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  const { t } = useTranslation("creator-studio");

  useEffect(() => {
    if (user._id) {
      fetchUserDocs(user._id, setData);
      fetchEditSubmissions(user._id, setEditRequests);
    }
  }, []);

  return (
    <Box>
      {/* Top Part */}
      <Paper sx={{ mb: 2, p: 2 }}>
        <Typography sx={{ mb: 2 }}>{t("edit_requests")}</Typography>

        <Box>
          <StudioEditsCarousel
            requests={editRequests.map((req, i) => ({
              _id: i,
              document_title: req.publishedDoc.title,
              image:
                "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
              ...req,
            }))}
          />
        </Box>
      </Paper>

      {/* Bottom Part */}
      <Box sx={{ width: "100%", minHeight: 400 }}>
        <DataGrid
          autoHeight
          rowHeight={70}
          rows={buildRows(data, t)}
          columns={buildColumns(t)}
          pageSize={pageSize}
          onPageSizeChange={(i) => setPageSize(i)}
          rowsPerPageOptions={[5, 10, 20, 50]}
        />
      </Box>
    </Box>
  );
};

export default Content;
