import ThemeToggleButton from "@components/buttons/ThemeToggle";
import LanguageMenu from "@components/menus/LanguageMenu";
import { NAVBAR_HEIGHT_DESKTOP, NAVBAR_HEIGHT_MOBILE } from "@constants/";
import withAppConfig from "@hoc/withAppConfig";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import DesktopMenuItems from "./DesktopMenuItems";

const LandingNavbar = ({ appConfig }) => {
  const [spotlight, setSpotlight] = useState(null);

  const theme = useTheme();

  const isLoggedIn = false;

  const { logo, projectName, navbar } = appConfig;
  const { themeToggle, menuItems, languagePopup, authButtons } = navbar;

  const Logo = () => (
    <Link href="/">
      <Box sx={{ height: 35, textTransform: "inherit", cursor: "pointer" }}>
        <img
          src={logo}
          alt={`${projectName} Logo`}
          style={{ height: "100%", objectFit: "contain" }}
        />
      </Box>
    </Link>
  );

  const MobileMenuItems = () => (
    <>
      {themeToggle && <ThemeToggleButton />}

      {languagePopup && <LanguageMenu />}

      {authButtons && <AuthButtons />}

      <IconButton
        size="large"
        edge="start"
        color="inherit"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{ ml: 1 }}
      >
        <MenuIcon />
      </IconButton>

      {/* <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {menuItems.map((item) => (
          <MenuItem key={item.name}>{item.name}</MenuItem>
        ))}
      </Menu> */}
    </>
  );

  return (
    <Box
      sx={{ flexGrow: 1 }}
      onMouseLeave={() => !!spotlight && setSpotlight(null)}
    >
      <AppBar position="static" color="transparent" elevation={0}>
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
            <Logo />

            {/* Menu Items */}
            <Box>
              {/* Desktop Menu */}
              <Hidden mdDown>
                <DesktopMenuItems
                  menuItems={menuItems}
                  themeToggle={themeToggle}
                  languagePopup={languagePopup}
                  authButtons={authButtons}
                />
              </Hidden>

              {/* Mobile Menu */}
              <Hidden mdUp>
                <MobileMenuItems />
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
