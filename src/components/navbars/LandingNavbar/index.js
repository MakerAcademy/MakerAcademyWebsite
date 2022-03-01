import { NAVBAR_HEIGHT_DESKTOP, NAVBAR_HEIGHT_MOBILE } from "@constants/";
import withAppConfig from "@hoc/withAppConfig";
import {
  AppBar,
  Box,
  Container,
  Divider,
  Hidden,
  Icon,
  Stack,
  SvgIcon,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import DesktopMenuItems from "./DesktopMenuItems";
import MobileMenuItems from "./MobileMenuItems";
import DaiIcon from "@components/DaiIcon";

const LandingNavbar = ({ appConfig, LeftComponent }) => {
  const [spotlight, setSpotlight] = useState(null);

  const theme = useTheme();

  const { navbar } = appConfig;
  const { themeToggle, menuItems, languagePopup, authButtons } = navbar;

  const Logo = () => (
    <Link href="/" passHref>
      <Box sx={{ height: 65, cursor: "pointer" }}>
        <DaiIcon name="maker_color" />
      </Box>
    </Link>
  );

  return (
    <Box
      sx={{ flexGrow: 1 }}
      onMouseLeave={() => !!spotlight && setSpotlight(null)}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: theme.palette.background.main,
          // Decrease the blur for a transparency-blurred effect
          // backdropFilter: "blur(50px)",
        }}
      >
        <Container maxWidth="xl">
          <Stack
            spacing={1}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              height: NAVBAR_HEIGHT_MOBILE,
              [theme.breakpoints.up("md")]: {
                height: NAVBAR_HEIGHT_DESKTOP,
              },
            }}
          >
            {/* Logo */}
            <Stack direction="row" spacing={2} alignItems="center">
              {LeftComponent && <LeftComponent />}
              <Logo />
            </Stack>

            {/* Menu Items */}
            <Box>
              {/* Desktop Menu */}
              <Hidden lgDown>
                <DesktopMenuItems
                  menuItems={menuItems}
                  themeToggle={themeToggle}
                  languagePopup={languagePopup}
                  authButtons={authButtons}
                />
              </Hidden>

              {/* Mobile Menu */}
              <Hidden lgUp>
                <MobileMenuItems
                  menuItems={menuItems}
                  themeToggle={themeToggle}
                  languagePopup={languagePopup}
                  authButtons={authButtons}
                />
              </Hidden>
            </Box>
          </Stack>
        </Container>
      </AppBar>
      <Divider />
    </Box>
  );
};

export default withAppConfig(LandingNavbar);
