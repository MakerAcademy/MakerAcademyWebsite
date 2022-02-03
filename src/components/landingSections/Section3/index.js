import RoundedButton from "@components/buttons/RoundedButton";
import { Container, Stack, Typography } from "@mui/material";
import React from "react";

const Section3 = () => {
  return (
    <Container sx={{ py: { xs: 3, md: 6, lg: 10 } }}>
      <Stack alignItems="center" justifyContent="center" spacing={3}>
        <Typography variant="h6">
          Want to learn more about our impact?
        </Typography>
        <RoundedButton>Performance</RoundedButton>
      </Stack>
    </Container>
  );
};

export default Section3;
