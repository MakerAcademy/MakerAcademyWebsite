import Section1 from "@components/landingSections/Section1";
import Section2 from "@components/landingSections/Section2";
import Section3 from "@components/landingSections/Section3";
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

  console.log(new Date());

  return (
    <Box>
      <Section1 />
      <Section2 />
      <Section3 />
    </Box>
  );
};

export default withAppConfig(Home);
