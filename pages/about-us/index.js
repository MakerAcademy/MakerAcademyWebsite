import React from "react";
import ResponsiveText from "@components/ResponsiveText";
import { Container, Stack, Typography } from "@mui/material";

const AboutUsPage = () => {
  return (
    <Container sx={{ py: 10 }}>
      <Stack justifyContent="center" alignItems="center" spacing={3}>
        <ResponsiveText variant="h3">About Us Page</ResponsiveText>

        <Typography>Coming soon...</Typography>
      </Stack>
    </Container>
  );
};

export default AboutUsPage;
