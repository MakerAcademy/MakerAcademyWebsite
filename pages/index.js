import LandingFooter from "@components/footers/LandingFooter";
import { withUser } from "@hoc/routes";
import { Box, Divider } from "@mui/material";
import Section1 from "@pages/landingSections/Section1";
import Section2 from "@pages/landingSections/Section2";
import Section3 from "@pages/landingSections/Section3";
import React from "react";

const Home = ({ user }) => {
  return (
    <Box>
      <Section1 user={user} />
      <Section2 user={user} />
      <Section3 />
      <Divider />
      <LandingFooter />
    </Box>
  );
};

export const getServerSideProps = withUser();

export default Home;
