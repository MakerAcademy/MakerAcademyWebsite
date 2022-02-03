import ResponsiveText from "@components/ResponsiveText";
import { Container, Stack, Typography } from "@mui/material";
import React from "react";

const ContributePage = () => {
  return (
    <Container sx={{ py: 10 }}>
      <Stack justifyContent="center" alignItems="center" spacing={3}>
        <ResponsiveText variant="h3">Contribute Page</ResponsiveText>

        <Typography>Coming soon...</Typography>
      </Stack>
    </Container>
  );
};

export default ContributePage;
