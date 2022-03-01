import { Box, Card, Stack, Typography } from "@mui/material";
import React from "react";
import CountUp from "react-countup";

const CreatorCounter = ({ count, text }) => {
  return (
    <Card sx={{ p: 2, height: "100%" }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
            {text}
          </Typography>
          <Typography variant="h3">
            <CountUp end={count} duration={2} />
          </Typography>
        </Box>

        <img
          src="https://www.pinclipart.com/picdir/big/375-3755301_graph-clipart-rating-business-growth-icon-png-transparent.png"
          alt="Random Chart"
          style={{ height: "100%", maxHeight: 50, objectFit: "contain" }}
        />
      </Stack>
    </Card>
  );
};

export default CreatorCounter;
