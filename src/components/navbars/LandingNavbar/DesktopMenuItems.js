import LanguageMenu from "@components/buttons/LanguageButton";
import ThemeToggleButton from "@components/buttons/ThemeToggle";
import commonProps from "@hoc/commonProps";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  useTheme,
} from "@mui/material";
import {
  bindHover,
  bindMenu,
  usePopupState,
} from "material-ui-popup-state/hooks";
import HoverMenu from "material-ui-popup-state/HoverMenu";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import React, { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";

const AUTH_LINK = "/sign-in";

const DesktopMenuItems = ({
  themeToggle,
  menuItems,
  languagePopup,
  authButtons,
  user,
}) => {
  const theme = useTheme();
  const [spotlight, setSpotlight] = useState(null);
  const [subMenu, setSubMenu] = useState(null);
  const [userAnchorEl, setUserAnchorEl] = useState(null);

  const userExists = !!user?.email;
  const isAdmin = user.trustLevel >= 3;

  const router = useRouter();
  const { t } = useTranslation("common");

  const popupState = usePopupState({
    variant: "popover",
    popupId: "demoMenu",
  });

  const handleClosePopup = () => {
    setSubMenu(setSubMenu);
    setSpotlight(null);
    popupState.close();
  };

  return (
    <Box onMouseLeave={() => setSpotlight(null)}>
      <Stack direction="row" spacing={0} alignItems="center">
        {menuItems.map((item, i) => (
          <Link href={item.link || ""} key={i} passHref>
            <Button
              size="large"
              color="inherit"
              onMouseEnter={() => {
                setSpotlight(item.link);
                setSubMenu(item.nestedItems || null);
              }}
              sx={{
                px: { md: 3, lg: 4 },
                textTransform: "inherit",
                fontSize: 18,
                fontWeight: 600,
                transition: "color 0.1s ease-in-out",
                color:
                  spotlight &&
                  spotlight !== item.link &&
                  theme.palette.text.disabled,
                "&:hover": {
                  color: "inherit !important",
                  backgroundColor: "transparent",
                },
              }}
              {...bindHover(popupState)}
            >
              {t(item.name)}
            </Button>
          </Link>
        ))}

        {authButtons && (
          <>
            {!!user.email ? (
              <>
                <Tooltip title="Account settings">
                  <IconButton onClick={(e) => setUserAnchorEl(e.currentTarget)}>
                    <Avatar
                      // sx={{ width: 32, height: 32 }}
                      src={user.displayImage}
                    />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <Link href={AUTH_LINK} passHref>
                <Button
                  size="large"
                  color="inherit"
                  onMouseEnter={() => {
                    setSpotlight(AUTH_LINK);
                    subMenu && setSubMenu(null);
                  }}
                  sx={{
                    px: { md: 3, lg: 4 },
                    textTransform: "inherit",
                    fontSize: 18,
                    fontWeight: 600,
                    transition: "color 0.1s ease-in-out",
                    color:
                      spotlight &&
                      spotlight !== AUTH_LINK &&
                      theme.palette.text.disabled,
                    "&:hover": {
                      color: "inherit !important",
                      backgroundColor: "transparent",
                    },
                  }}
                  {...bindHover(popupState)}
                >
                  {t("sign_in")}
                </Button>
              </Link>
            )}
          </>
        )}

        {themeToggle && (
          <ThemeToggleButton
            onMouseEnter={() => setSpotlight(true)}
            sx={{
              ml: userExists && 2,
              color: spotlight && theme.palette.text.disabled,
              "&:hover": {
                color: "inherit !important",
                backgroundColor: "transparent",
              },
            }}
          />
        )}

        {languagePopup && (
          <LanguageMenu
            onMouseEnter={() => setSpotlight(true)}
            sx={{
              ml: 2,
              color: spotlight && theme.palette.text.disabled,
              "&:hover": {
                color: "inherit !important",
                backgroundColor: "transparent",
              },
            }}
          />
        )}
      </Stack>

      {subMenu && (
        <HoverMenu
          {...bindMenu(popupState)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          PaperProps={{ sx: { width: 135 } }}
        >
          {subMenu.map((item, i) => (
            <Link href={item.link || ""} key={i} passHref>
              <MenuItem onClick={handleClosePopup}>{t(item.name)}</MenuItem>
            </Link>
          ))}
        </HoverMenu>
      )}

      {!!userAnchorEl && (
        <Menu
          anchorEl={userAnchorEl}
          id="account-menu"
          open={!!userAnchorEl}
          onClose={() => setUserAnchorEl(null)}
          // onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem
            onClick={() => {
              setUserAnchorEl(null);
              router.push("/account");
            }}
          >
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            {t("my_account")}
          </MenuItem>

          {isAdmin && (
            <MenuItem
              onClick={() => {
                setUserAnchorEl(null);
                router.push("/admin");
              }}
            >
              <ListItemIcon>
                <AdminPanelSettingsOutlinedIcon fontSize="small" />
              </ListItemIcon>
              {t("admin")}
            </MenuItem>
          )}

          <MenuItem
            onClick={() => {
              setUserAnchorEl(null);
              router.push("/studio/content");
            }}
          >
            <ListItemIcon>
              <OndemandVideoIcon fontSize="small" />
            </ListItemIcon>
            {t("creator_studio")}
          </MenuItem>

          <MenuItem
            onClick={() => {
              setUserAnchorEl(null);
              signOut();
            }}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            {t("logout")}
          </MenuItem>
        </Menu>
      )}
    </Box>
  );
};

export default commonProps(DesktopMenuItems);
