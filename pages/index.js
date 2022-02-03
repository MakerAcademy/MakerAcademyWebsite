import Section1 from "@components/landing/Section1";
import Section2 from "@components/landing/Section2";
import Section3 from "@components/landing/Section3";
import withAppConfig from "@hoc/withAppConfig";
import {
  Box,
  Container,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import React from "react";

const checklists = [
  "Project setup ✅",
  "Material UI v5 ✅",
  "Themeing setup (light/dark) ✅",
  "Localizations setup (next-translation) ✅",
  "Google Analytics",
  "Redux/context setup ✅",
  "Landing Page Layout ✅",
  "Dashboard Layout",
  "Authentication",
];

const Home = ({ appConfig }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const { t, lang } = useTranslation();

  const { projectName } = appConfig;

  return (
    <Box>
      <Section1 />
      <Section2 />
      <Section3 />

      <Container sx={{ p: 2, mt: 10 }}>
        <Stack spacing={2}>
          <Typography>Project Name: {projectName}</Typography>

          <Divider />

          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>Theme Mode: {mode}</Typography>
          </Stack>

          <Divider />

          <div>
            <Typography>Language: {lang}</Typography>
            <Typography>Greeting: {t("home:hello")}</Typography>
          </div>

          <Divider />

          <Typography>Todos:</Typography>
          {checklists.map((item, i) => (
            <Typography variant="h6" key={i}>
              {i + 1}. {item}
            </Typography>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default withAppConfig(Home);
