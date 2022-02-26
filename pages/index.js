import { Box } from "@mui/material";
import Section1 from "@pages/landingSections/Section1";
import Section2 from "@pages/landingSections/Section2";
import Section3 from "@pages/landingSections/Section3";
import React from "react";
import moment from "moment";

const Home = (props) => {
  console.log(moment.utc().format());
  return (
    <Box>
      <Section1 />
      <Section2 />
      <Section3 />
    </Box>
  );
};

export default Home;
