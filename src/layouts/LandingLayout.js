import LandingNavbar from "@components/navbars/LandingNavbar";
import { Container, Divider } from "@mui/material";
import React from "react";

const LandingLayout = (props) => {
  return (
    <div>
      <LandingNavbar />

      {props.children}

      <Divider />

      <Container sx={{ py: 5 }}>
        ----------------------- Footer Here -----------------------
      </Container>
    </div>
  );
};

export default LandingLayout;
