import RoundedButton from "@components/buttons/RoundedButton";
import { Container, Stack, Typography } from "@mui/material";
import React from "react";

const Section3 = () => {
  return (
    <Container sx={{ py: 3 }}>
      <Stack alignItems="center" justifyContent="center" spacing={2}>
        <Typography>Want to learn more about our impact?</Typography>
        <RoundedButton>Performance</RoundedButton>
      </Stack>
    </Container>
  );
};

export default Section3;
