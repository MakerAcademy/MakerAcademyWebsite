import { Grid, Paper, Typography } from "@mui/material";
import React from "react";

const Dashboard = () => {
  return (
    <Grid container spacing={5}>
      {/* Left */}
      <Grid item xs={12} md={4}>
        <Paper elevation={2} sx={{ p: 3, width: "100%", height: "100%" }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Creator Studio
          </Typography>

          <Typography sx={{ lineHeight: 1.5 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
        </Paper>
      </Grid>

      {/* Middle */}
      <Grid item xs={12} md={4}>
        <Paper elevation={2} sx={{ p: 3, width: "100%", height: 600 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Creation Program
          </Typography>
        </Paper>
      </Grid>

      {/* Right */}
      <Grid item xs={12} md={4}>
        <Paper elevation={2} sx={{ p: 3, width: "100%", height: "100%" }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Content Bounties
          </Typography>

          <Typography sx={{ lineHeight: 1.5 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
