import ThemeToggleButton from "@components/buttons/ThemeToggle";
import LanguageMenu from "@components/menus/LanguageMenu";
import { Button, MenuItem, Stack } from "@mui/material";
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
  const [spotlight, setSpotlight] = useState(null);

  const popupState = usePopupState({
    variant: "popover",
    popupId: "demoMenu",
  });

  return (
    <React.Fragment>
      <Stack direction="row" spacing={0} alignItems="center">
        {menuItems.map((item, i) => (
          <Link href={item.href || ""} key={i}>
            <Button
              size="large"
              color="inherit"
              sx={{
                px: { md: 3, lg: 4 },
                textTransform: "inherit",
                fontSize: 18,
                fontWeight: 600,
                transition: "color 0.1s ease-in-out",
                color: spotlight && theme.palette.text.disabled,
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

        {/* {authButtons && <AuthButtons />} */}

        {themeToggle && (
          <ThemeToggleButton
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
        <MenuItem onClick={popupState.close}>Cake</MenuItem>
        <MenuItem onClick={popupState.close}>Death</MenuItem>
      </HoverMenu>
    </React.Fragment>
  );
};

export default MenuPopupState;
