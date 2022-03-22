import { Button, Hidden, IconButton } from "@mui/material";
import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

const BackButton = ({ sx = {} }) => {
  const router = useRouter();

  const { t } = useTranslation("common");

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
          <ArrowBackIosIcon sx={{ fontSize: 16 }} /> {t("back")}
        </Button>
      </Hidden>
    </>
  );
};

export default BackButton;
