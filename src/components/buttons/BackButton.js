import { Button, Hidden, IconButton } from "@mui/material";
import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useRouter } from "next/router";

const BackButton = ({ sx = {} }) => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <>
      <Hidden smUp>
        <IconButton onClick={goBack} sx={{ ...sx }}>
          <ArrowBackIosIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Hidden>

      <Hidden smDown>
        <Button size="small" onClick={goBack} sx={{ ...sx }}>
          <ArrowBackIosIcon sx={{ fontSize: 16 }} /> Back
        </Button>
      </Hidden>
    </>
  );
};

export default BackButton;
