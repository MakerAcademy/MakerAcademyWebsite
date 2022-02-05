import RoundedButton from "@components/buttons/RoundedButton";
import ResponsiveText from "@components/ResponsiveText";
import GoogleIcon from "@mui/icons-material/Google";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
  Divider,
  IconButton,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";

const SignUpForm = () => {
  const theme = useTheme();

  const [type, setType] = useState("learner");

  const handleChange = (event, _type) => {
    setType(_type);
  };

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

      <Typography>Join Maker Academy as a</Typography>

      <ToggleButtonGroup
        color="primary"
        value={type}
        exclusive
        onChange={handleChange}
        fullWidth
        sx={{ maxWidth: 450 }}
      >
        <ToggleButton value="learner">Learner</ToggleButton>
        <ToggleButton value="educator">Educator</ToggleButton>
        <ToggleButton value="contributor">Contributor</ToggleButton>
      </ToggleButtonGroup>

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

      <RoundedButton fullWidth sx={{ maxWidth: 200 }}>
        Sign up
      </RoundedButton>

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
