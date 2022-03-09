import AdminPendingCard from "@components/cards/AdminPendingCard";
import { Grid, Typography } from "@mui/material";
import React from "react";

const DUMMY_DATA = Array(20)
  .fill()
  .map((_, i) => ({
    _id: i,
    title: `Title ${i}`,
    author: "Colby Anderson",
    image:
      "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png",
    description: "lorem ipsum description",
  }));

const Pending = () => {
  return (
    <div>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Awaiting Approvals
      </Typography>

      <Grid container spacing={4}>
        {DUMMY_DATA.map((item) => (
          <Grid item key={item._id} xs={12} sm={6} md={4} lg={3}>
            <AdminPendingCard {...item} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Pending;
