import { Box, Divider } from "@mui/material";
import Section1 from "@pages/landingSections/Section1";
import Section2 from "@pages/landingSections/Section2";
import Section3 from "@pages/landingSections/Section3";
import LandingFooter from "@components/footers/LandingFooter";
import React from "react";

const Home = (props) => {
  return (
    <Box>
      <Section1 />
      <Section2 />
      <Section3 />
      <Divider />
      <LandingFooter />
    </Box>
  );
};

export default Home;
