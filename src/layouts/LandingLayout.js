import { Container } from "@mui/material";
import React from "react";
import LandingNavbar from "@components/navbars/LandingNavbar";

const LandingLayout = (props) => {
  return (
    <div>
      <LandingNavbar />
      <Container maxWidth="lg" sx={{ py: 2 }}>
        {props.children}
      </Container>
    </div>
  );
};

export default LandingLayout;
