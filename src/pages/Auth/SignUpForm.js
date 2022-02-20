import RoundedButton from "@components/buttons/RoundedButton";
import RegisterForm from "@components/forms/SignUpForm";
import ResponsiveText from "@components/ResponsiveText";
import GoogleIcon from "@mui/icons-material/Google";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

const SignUpForm = () => {
  const theme = useTheme();

  const SocialButton = ({ color, children }) => (
    <IconButton
      size="large"
      sx={{
        backgroundColor: color,
        color: theme.palette.primary.white,
        "&:hover": {
          backgroundColor: color,
        },
      }}
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
        Create An Account
      </ResponsiveText>

      <Box sx={{ width: "100%" }}>
        <RegisterForm />
      </Box>

      <Divider variant="middle" sx={{ width: "100%", maxWidth: 410 }}>
        Or
      </Divider>

      <Typography>Sign up using social networks</Typography>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={2.5}
      >
        <SocialButton color="#DF4D3B">
          <GoogleIcon />
        </SocialButton>

        <SocialButton color="#1C9CEA">
          <TwitterIcon />
        </SocialButton>

        <SocialButton color="#47546D">
          <LinkedInIcon />
        </SocialButton>
      </Stack>
    </Stack>
  );
};

export default SignUpForm;
