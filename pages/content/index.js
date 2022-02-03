import React from "react";
import ResponsiveText from "@components/ResponsiveText";
import { Container, Stack, Typography } from "@mui/material";

const ContentPage = () => {
  return (
    <Container sx={{ py: 10 }}>
      <Stack justifyContent="center" alignItems="center" spacing={3}>
        <ResponsiveText variant="h3">Content Page</ResponsiveText>

        <Typography>Coming soon...</Typography>
      </Stack>
    </Container>
  );
};

export default ContentPage;
