import TeamCard from "@components/cards/TeamCard";
import { Grid, Stack, Typography } from "@mui/material";
import React from "react";

const TEAM = [
  {
    image:
      "https://en.cryptonomist.ch/wp-content/uploads/2021/07/maker-a2z-crypto-1.jpg",
    name: "Colby Anderson",
    title: "Facilitator",
    description: "A few lines description here",
    linkedIn: "",
    twitter: "",
    website: "",
  },
  {
    image:
      "https://en.cryptonomist.ch/wp-content/uploads/2021/07/maker-a2z-crypto-1.jpg",
    name: "Zach Huang",
    title: "Project Manager",
    description: "A few lines description here",
    linkedIn: "",
    twitter: "",
    website: "",
  },
  {
    image:
      "https://en.cryptonomist.ch/wp-content/uploads/2021/07/maker-a2z-crypto-1.jpg",
    name: "Salman Fazal",
    title: "Frontend Engineer",
    description: "A few lines description here",
    linkedIn: "",
    twitter: "",
    website: "",
  },
];

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
          <Grid item xs={12} md={4} key={i}>
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
