import ResponsiveText from "@components/ResponsiveText";
import withAppConfig from "@hoc/withAppConfig";
import { Box, Container, Grid, Hidden, Stack, useTheme } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import SignInContent from "./SignInContent";
import SignInForm from "./SignInForm";
import SignUpContent from "./SignUpContent";
import SignUpForm from "./SignUpForm";
import CloseIcon from "@mui/icons-material/Close";
import Router, { useRouter } from "next/router";
import { SIGNIN, SIGNUP } from "@constants/routes";

const AuthForm = ({ appConfig, providers }) => {
  const theme = useTheme();
  const { pathname } = useRouter();

  const [mode, setMode] = useState(pathname === SIGNIN ? SIGNIN : SIGNUP);

  const { logoDark, projectName } = appConfig;

  const triggerMode = () => {
    setMode((old) => (old === SIGNUP ? SIGNIN : SIGNUP));
  };

  const CloseButton = () => (
    <CloseIcon
      onClick={() => Router.push("/")}
      sx={{
        zIndex: 999999,
        fontSize: 55,
        color: theme.palette.text.disabled,
        cursor: "pointer",
        "&:hover": {
          color: theme.palette.primary.main,
        },
      }}
    />
  );

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      {/* Left Content */}
      <Grid
        item
        xs={12}
        md={5}
        lg={4}
        sx={{ backgroundColor: theme.palette.primary.main }}
      >
        <Stack sx={{ height: "100%" }}>
          {/* Logo */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            sx={{ p: 3 }}
          >
            <Link href="/">
              <img
                src={logoDark}
                alt={projectName}
                style={{
                  height: 45,
                  objectFit: "contain",
                  cursor: "pointer",
                }}
              />
            </Link>

            <Hidden mdUp>
              <CloseButton />
            </Hidden>
          </Stack>

          {/* Content */}
          <Box
            sx={{
              flex: 1,
              [theme.breakpoints.up("md")]: { mt: -7 },
            }}
          >
            <Container
              sx={{
                py: 5,
                height: "100%",
              }}
              maxWidth="xs"
            >
              {mode === SIGNIN ? (
                <SignInContent handleSignUp={triggerMode} />
              ) : (
                <SignUpContent handleSignIn={triggerMode} />
              )}
            </Container>
          </Box>
        </Stack>
      </Grid>

      {/* Right Form */}
      <Grid item xs={12} md={7} lg={8}>
        <Stack sx={{ height: "100%" }}>
          {/* Close Button */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            sx={{ p: 2 }}
          >
            <Hidden mdDown>
              <CloseButton />
            </Hidden>
          </Stack>

          {/* Content */}
          <Box sx={{ flex: 1, [theme.breakpoints.up("md")]: { mt: -7 } }}>
            <Container
              sx={{
                py: 5,
                height: "100%",
              }}
              maxWidth="md"
            >
              {mode === SIGNIN ? (
                <SignInForm providers={providers} />
              ) : (
                <SignUpForm providers={providers} />
              )}
            </Container>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default withAppConfig(AuthForm);
