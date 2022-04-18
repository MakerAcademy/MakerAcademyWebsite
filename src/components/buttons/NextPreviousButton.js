import { Box, Button, Stack } from "@mui/material";
import Link from "next/link";
import React from "react";

const NextPreviousButton = ({
  nextRoute,
  previousRoute,
  nextText = "Next",
  previousText = "Previous",
  intlText = false,
}) => {
  return (
    <Stack direction="row" justifyContent="space-between" spacing={2}>
      <Box>
        {previousRoute && (
          <Link href={previousRoute} passHref>
            <Button>{previousText}</Button>
          </Link>
        )}
      </Box>

      <Box>
        {nextRoute && (
          <Link href={nextRoute} passHref>
            <Button>{nextText}</Button>
          </Link>
        )}
      </Box>
    </Stack>
  );
};

export default NextPreviousButton;
