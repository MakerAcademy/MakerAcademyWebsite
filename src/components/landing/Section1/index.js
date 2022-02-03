import RoundedButton from "@components/buttons/RoundedButton";
import ResponsiveText from "@components/ResponsiveText";
import { NAVBAR_HEIGHT_DESKTOP } from "@constants/";
import { NAVBAR_HEIGHT_MOBILE } from "@constants/";
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { HomeBg } from "@utils/images";
import React from "react";

const Section1 = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        marginTop: `-${NAVBAR_HEIGHT_MOBILE}px`,
        [theme.breakpoints.up("md")]: {
          marginTop: `-${NAVBAR_HEIGHT_DESKTOP}px`,
        },
      }}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          p: 3,
          pt: 8,
          [theme.breakpoints.up("md")]: {
            minHeight: "60vh",
            backgroundImage: `url(${HomeBg})`,
            // backgroundPosition: "center center",
            backgroundSize: "cover",
          },
          [theme.breakpoints.up("lg")]: {
            minHeight: "70vh",
          },
        }}
      >
        <Container maxWidth="xl">
          <Stack alignItems="center" justifyContent="center">
            <ResponsiveText variant="h2" sx={{ mb: 1 }}>
              Maker Academy
            </ResponsiveText>

            <ResponsiveText variant="h4" sx={{ mb: 2 }}>
              Learn. Contribute. Innovate
            </ResponsiveText>

            <Typography variant="h6" sx={{ mb: 3 }}>
              The primary source for Maker education
            </Typography>

            <RoundedButton sx={{ px: 4, py: 1.5 }}>About Us</RoundedButton>
          </Stack>
        </Container>
      </Stack>
      <Divider />
    </Box>
  );
};

export default Section1;
