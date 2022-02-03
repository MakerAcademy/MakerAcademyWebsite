import ThemeToggleButton from "@components/buttons/ThemeToggle";
import LanguageMenu from "@components/menus/LanguageMenu";
import { Box, Button, MenuItem, Stack, useTheme } from "@mui/material";
import {
  bindHover,
  bindMenu,
  usePopupState,
} from "material-ui-popup-state/hooks";
import HoverMenu from "material-ui-popup-state/HoverMenu";
import Link from "next/link";
import React, { useState } from "react";

const MenuPopupState = ({
  themeToggle,
  menuItems,
  languagePopup,
  authButtons,
}) => {
  const theme = useTheme();
  const [spotlight, setSpotlight] = useState(null);
  const [subMenu, setSubMenu] = useState(null);

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
          <Link href={item.link || ""} key={i}>
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
              {item.name}
            </Button>
          </Link>
        ))}

        {/* Implement auth buttons with auth ready */}
        {/* {authButtons && <AuthButtons />} */}

        {themeToggle && (
          <ThemeToggleButton
            onMouseEnter={() => setSpotlight(true)}
            sx={{
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
            <Link href={item.link || ""} key={i}>
              <MenuItem onClick={handleClosePopup}>{item.name}</MenuItem>
            </Link>
          ))}
        </HoverMenu>
      )}
    </Box>
  );
};

export default MenuPopupState;
