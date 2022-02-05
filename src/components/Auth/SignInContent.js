import RoundedButton from "@components/buttons/RoundedButton";
import ResponsiveText from "@components/ResponsiveText";
import { Stack, useTheme } from "@mui/material";
import React from "react";

const SignInContent = ({ handleSignUp }) => {
  const theme = useTheme();

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      spacing={4}
      sx={{
        height: "100%",
        color: theme.palette.primary.white,
      }}
    >
      <ResponsiveText variant="h2">Sign In</ResponsiveText>

      <ResponsiveText variant="h5">Good to see you again!</ResponsiveText>

      <ResponsiveText variant="h6" sx={{ fontWeight: 400, pb: 3 }}>
        By logging in for Maker Academy, you agree to our Terms of Use and our
        Privacy Policy.
      </ResponsiveText>

      <RoundedButton
        variant="white"
        fullWidth
        sx={{ maxWidth: 250 }}
        onClick={handleSignUp}
      >
        Sign Up
      </RoundedButton>
    </Stack>
  );
};

export default SignInContent;
