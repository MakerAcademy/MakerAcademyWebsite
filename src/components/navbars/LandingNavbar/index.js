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
import { useRouter } from "next/router";
import React, { useState } from "react";

const LandingNavbar = ({ appConfig }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();

  const router = useRouter();
  const { route } = router;

  const isLoggedIn = false;

  const { logo, projectName, navbar } = appConfig;
  const { themeToggle, menuItems, languagePopup, authButtons } = navbar;

  const AuthButtons = () => {
    if (!isLoggedIn) {
      return (
        <Link href="/account">
          <Button
            disableElevation
            size="large"
            sx={{
              textTransform: "inherit",
              fontSize: 16,
            }}
            color="inherit"
            variant={route === "/account" ? "outlined" : "text"}
          >
            Account
          </Button>
        </Link>
      );
    } else {
      return (
        <Button
          disableElevation
          size="large"
          sx={{
            textTransform: "inherit",
            fontSize: 16,
          }}
          color="inherit"
        >
          Log Out
        </Button>
      );
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
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
            <Box sx={{ height: 45, textTransform: "inherit" }}>
              <img
                src={logo}
                alt={`${projectName} Logo`}
                style={{ height: "100%", objectFit: "contain" }}
              />
            </Box>

            {/* Menu Items */}
            <Box>
              {/* Desktop Menu */}
              <Hidden mdDown>
                <Stack direction="row" spacing={2}>
                  {menuItems.map((item, i) => (
                    <Link href={item.link} key={i}>
                      <Button
                        disableElevation
                        size="large"
                        sx={{
                          textTransform: "inherit",
                          fontSize: 16,
                        }}
                        color="inherit"
                        variant={route === item.link ? "outlined" : "text"}
                      >
                        {item.name}
                      </Button>
                    </Link>
                  ))}

                  {authButtons && <AuthButtons />}

                  {themeToggle && <ThemeToggleButton />}

                  {languagePopup && <LanguageMenu />}
                </Stack>
              </Hidden>

              {/* Mobile Menu */}
              <Hidden mdUp>
                {themeToggle && <ThemeToggleButton />}

                {languagePopup && <LanguageMenu />}

                {authButtons && <AuthButtons />}

                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  onClick={handleMenu}
                  sx={{ ml: 1 }}
                >
                  <MenuIcon />
                </IconButton>

                <Menu
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
                  onClose={handleClose}
                >
                  {menuItems.map((item) => (
                    <MenuItem key={item.name}>{item.name}</MenuItem>
                  ))}
                </Menu>
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
