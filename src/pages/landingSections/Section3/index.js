import RoundedButton from "@components/buttons/RoundedButton";
import { Container, Stack, Typography } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import React from "react";

const Section3 = () => {
  const { t } = useTranslation("home");

  return (
    <Container sx={{ py: { xs: 3, md: 6, lg: 10 } }}>
      <Stack alignItems="center" justifyContent="center" spacing={3}>
        <Typography variant="h6">{t("learn_about_impact")}</Typography>
        <RoundedButton>{t("performance")}</RoundedButton>
      </Stack>
    </Container>
  );
};

export default Section3;
