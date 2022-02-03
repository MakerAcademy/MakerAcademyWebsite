import { Container } from "@mui/material";
import React from "react";
import LandingNavbar from "@components/navbars/LandingNavbar";

const LandingLayout = (props) => {
  return (
    <div>
      <LandingNavbar />

      {props.children}
    </div>
  );
};

export default LandingLayout;
