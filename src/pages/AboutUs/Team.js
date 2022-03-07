import TeamCard from "@components/cards/TeamCard";
import { Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { TEAM } from "./dummyData";

const Team = () => {
  return (
    <Stack alignItems="center" spacing={4}>
      <Typography sx={{ fontWeight: 600 }}>Our Teams</Typography>

      <Typography sx={{ maxWidth: 700, fontWeight: 300, textAlign: "center" }}>
        Our expert team is made up of creatives wih technical knowhow,
        strategics who think outside the box, and developers who push
        innovation.
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {TEAM.map((member, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
            <Stack alignItems="center">
              <TeamCard {...member} />
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default Team;
