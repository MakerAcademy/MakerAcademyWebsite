import { NAVBAR_HEIGHT_DESKTOP } from "@constants/";
import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const Server = () => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={2}
      sx={{
        textAlign: "center",
        p: 2,
        minHeight: `calc(100vh - ${NAVBAR_HEIGHT_DESKTOP + 10}px)`,
      }}
    >
      <Typography variant="h4">Server-side error occured</Typography>

      <Link href="/" passHref>
        <Button>Go to homepage</Button>
      </Link>
    </Stack>
  );
};

export default Server;
