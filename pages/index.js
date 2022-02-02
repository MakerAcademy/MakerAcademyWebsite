import ThemeToggle from "@components/Buttons/ThemeToggle";
import withAppConfig from "@hoc/withAppConfig";
import {
  Button,
  Container,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import setLanguage from "next-translate/setLanguage";
import useTranslation from "next-translate/useTranslation";
import React from "react";

const Home = ({ appConfig }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const { t, lang } = useTranslation();

  const { projectName, Logo, locales } = appConfig;

  return (
    <Container sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>Theme Mode: {mode}</Typography>
          <ThemeToggle />
        </Stack>

        <Divider />

        <div>
          <Typography>Language: {lang}</Typography>
          {locales.map((locale) => (
            <Button
              key={locale}
              onClick={async () => await setLanguage(locale)}
            >
              {locale}
            </Button>
          ))}
          <Typography>Greeting: {t("home:hello")}</Typography>
        </div>

        <Divider />

        <Typography>Project Name: {projectName}</Typography>

        <Divider />

        <Typography>Logo</Typography>

        <img src={Logo} alt={projectName} style={{ height: 100, width: 100 }} />
      </Stack>
    </Container>
  );
};

export default withAppConfig(Home);
