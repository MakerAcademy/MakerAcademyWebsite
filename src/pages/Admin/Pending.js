import AdminPendingCard from "@components/cards/AdminPendingCard";
import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchPendingDocs } from "./helperFunctions";

const Pending = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchPendingDocs(setData);
  }, []);

  console.log(data)

  return (
    <div>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Awaiting Approvals
      </Typography>

      <Grid container spacing={4}>
        {data.map((item) => (
          <Grid item key={item._id} xs={12} sm={6} md={4} lg={3}>
            <AdminPendingCard {...item} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Pending;
