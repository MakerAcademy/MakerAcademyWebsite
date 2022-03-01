import LandingNavbar from "@components/navbars/LandingNavbar";
import { Box, Divider } from "@mui/material";
import React from "react";

const LandingLayout = (props) => {
  return (
    <Box>
      <LandingNavbar />

      {props.children}

      {/* <LandingFooter /> */}
    </Box>
  );
};

export default LandingLayout;
