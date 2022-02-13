import ResponsiveText from "@components/ResponsiveText";
import {
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import RoundedButton from "@components/buttons/RoundedButton";
import Link from "next/link";

const SignInForm = () => {
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
        Sign In to Your Account
      </ResponsiveText>

      <TextField
        variant="filled"
        label="Email"
        placeholder="Email / username"
        fullWidth
        sx={{ maxWidth: 450 }}
        // InputProps={{ sx: { borderRadius: 20 } }}
      />

      <TextField
        variant="filled"
        label="Password"
        placeholder="Password"
        type="password"
        fullWidth
        sx={{ maxWidth: 450 }}
      />

      <Link href="/account">
        <RoundedButton fullWidth sx={{ maxWidth: 200 }}>
          Sign in
        </RoundedButton>
      </Link>

      <Divider variant="middle" sx={{ width: "100%", maxWidth: 410 }}>
        Or
      </Divider>

      <Typography>Sign in using social networks</Typography>

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

export default SignInForm;
