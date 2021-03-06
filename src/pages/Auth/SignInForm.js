import LoginForm from "@components/forms/SignInForm";
import ResponsiveText from "@components/ResponsiveText";
import { Box, IconButton, Stack, useTheme } from "@mui/material";
import React from "react";

const SignInForm = ({ providers }) => {
  const theme = useTheme();

  const SocialButton = ({ color, children, ...other }) => (
    <IconButton
      size="large"
      sx={{
        backgroundColor: color,
        color: theme.palette.primary.white,
        "&:hover": {
          backgroundColor: color,
        },
      }}
      {...other}
    >
      {children}
    </IconButton>
  );

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={3}
      sx={{
        height: "100%",
      }}
    >
      <ResponsiveText variant="h2" sx={{ mb: 2 }}>
        Sign In to Your Account
      </ResponsiveText>

      <Box sx={{ width: "100%" }}>
        <LoginForm />
      </Box>

      {/*<Divider variant="middle" sx={{ width: "100%", maxWidth: 410 }}>*/}
      {/*  Or*/}
      {/*</Divider>*/}

      {/*<Typography>Sign in using social networks</Typography>*/}

      {/*<Stack*/}
      {/*  direction="row"*/}
      {/*  alignItems="center"*/}
      {/*  justifyContent="center"*/}
      {/*  spacing={2.5}*/}
      {/*>*/}
      {/*  <SocialButton color="#DF4D3B" onClick={() => signIn("google")}>*/}
      {/*    <GoogleIcon />*/}
      {/*  </SocialButton>*/}
      {/*</Stack>*/}
    </Stack>
  );
};

export default SignInForm;
