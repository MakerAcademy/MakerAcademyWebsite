import { Box, Typography } from "@mui/material";
import React from "react";

const DUMMY_TEXT = `
Contributor Pipelines.....
bug bounties, grants, core unit incubation, onboarding, educating, enterprise integration.... bug bounties..what it is? the required knowledge to do it? the incentives for the contributor? what the process looks like? examples, such as past bug bounties

Available Grant/Research Projects.... who had the idea for the project, what the processs is like, meaning how you work on it...incentives..descriptions of projects

Abailable MakerDAO positions....job descriptions, what the hiring pipeline looks like, who posted the job descriptions

Expected MakerDAO positions....

Have an organization that should collaborate with Maker??.....

Recent contributor innovations at MakerDAO. (from academy)..

leaderboard of bounties collected, or best grant projects

maybe include top learners and top contributors and top educators on the performance dashboard

Want to reach out to other qualified learners?....user database that you can filter on certificate, hours of content watched, sort by this etc, 

TAB: Analytics (specifically tracking github progress)
`;

const Dashboard = () => {
  return (
    <Box>
      <Typography sx={{ whiteSpace: "pre-line", maxWidth: 1000 }}>
        Coming Soon
      </Typography>
    </Box>
  );
};

export default Dashboard;
