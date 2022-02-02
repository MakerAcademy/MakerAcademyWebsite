import React from "react";
import withAppConfig from "@hoc/withAppConfig";
import {
  Button,
  Container,
  Divider,
  Hidden,
  Link,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import ThemeToggle from "@components/Buttons/ThemeToggle";

const Home = ({ appConfig }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const { projectName, Logo } = appConfig;

  return (
    <Container sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>Theme Mode: {mode}</Typography>
          <ThemeToggle />
        </Stack>

        <Typography>Project Name: {projectName}</Typography>

        <Typography>Logo</Typography>

        <img src={Logo} alt={projectName} style={{ height: 100, width: 100 }} />
      </Stack>
    </Container>
  );
};

export default withAppConfig(Home);
