import LandingFooter from "@components/footers/LandingFooter";
import LandingNavbar from "@components/navbars/LandingNavbar";
import { Divider } from "@mui/material";
import React from "react";

const LandingLayout = (props) => {
  return (
    <div>
      <LandingNavbar />

      {props.children}

      <Divider />

      <LandingFooter />
    </div>
  );
};

export default LandingLayout;
