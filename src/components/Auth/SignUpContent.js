import RoundedButton from "@components/buttons/RoundedButton";
import ResponsiveText from "@components/ResponsiveText";
import { Stack, useTheme } from "@mui/material";
import React from "react";

const SignUpContent = ({ handleSignIn }) => {
  const theme = useTheme();

  return (
    <Stack
      spacing={5}
      justifyContent="center"
      alignItems="center"
      sx={{
        py: { xs: 3, md: 5 },
        height: "100%",
        color: theme.palette.primary.white,
        textAlign: "center",
      }}
    >
      <ResponsiveText variant="h2">Sign Up</ResponsiveText>

      <Stack spacing={1}>
        <ResponsiveText variant="h5">Why join as a learner?</ResponsiveText>

        <ResponsiveText
          variant="h6"
          sx={{ fontWeight: 300, textAlign: "left" }}
        >
          {
            "Joining as a learner will give you the SAME features as an educator or contributor. Choosing the best category you fall under just helps with Maker Academy's analytics :)"
          }
        </ResponsiveText>
      </Stack>

      <Stack spacing={1}>
        <ResponsiveText variant="h5">Why create an account?</ResponsiveText>
        <ResponsiveText
          variant="h6"
          sx={{ fontWeight: 300, textAlign: "left" }}
        >
          Creating an account will give you access to the following features:
        </ResponsiveText>
        <ResponsiveText
          variant="h6"
          sx={{
            fontWeight: 300,
            whiteSpace: "pre-line",
            pb: 3,
            textAlign: "left",
          }}
        >
          {`• Continuing content where you left off
            • Saving content
            • Creating content
            • Earning certificates for your learning
          `}
        </ResponsiveText>
      </Stack>

      <RoundedButton
        variant="white"
        fullWidth
        sx={{ maxWidth: 250 }}
        onClick={handleSignIn}
      >
        Sign In
      </RoundedButton>
    </Stack>
  );
};

export default SignUpContent;
