import { NAVBAR_HEIGHT_DESKTOP } from "@constants/";
import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const PageNotFound = ({ title = "page" }) => {
  const router = useRouter();

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={3}
      sx={{
        textAlign: "center",
        p: 2,
        minHeight: `calc(100vh - ${NAVBAR_HEIGHT_DESKTOP + 10}px)`,
      }}
    >
      <Typography variant="h4" sx={{ textTransform: "capitalize" }}>
        {title} not found
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: 400, maxWidth: 550 }}>
        The {title} you're looking for is either missing or it doesn't exist.
        Double-check that the web address is correct.
      </Typography>

      <Stack direction={{ md: "row" }} spacing={1}>
        <Button onClick={() => router.back()}>Go Back</Button>

        <Link href="/" passHref>
          <Button>Go to homepage</Button>
        </Link>
      </Stack>
    </Stack>
  );
};

export default PageNotFound;
