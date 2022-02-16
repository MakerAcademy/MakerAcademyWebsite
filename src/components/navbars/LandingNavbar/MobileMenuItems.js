import ThemeToggleButton from "@components/buttons/ThemeToggle";
import LanguageMenu from "@components/menus/LanguageMenu";
import { Box, IconButton, Menu, MenuItem, useTheme } from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

const MobileMenuItems = ({
  themeToggle,
  menuItems,
  languagePopup,
  authButtons,
}) => {
  const [anchorEl, setAnchorEl] = useState();
  const theme = useTheme();

  const { t } = useTranslation("common");

  return (
    <>
      {themeToggle && <ThemeToggleButton />}

      {languagePopup && <LanguageMenu />}

      {/* {authButtons && <AuthButtons />} */}

      <IconButton
        size="large"
        edge="start"
        color="inherit"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{ ml: 1 }}
      >
        <MenuIcon />
      </IconButton>

      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{ sx: { minWidth: 300 } }}
      >
        {menuItems.map((item, i) => (
          <Box key={i}>
            <Link href={item.link || ""}>
              <MenuItem>{t(item.name)}</MenuItem>
            </Link>

            {item.nestedItems?.map((subItem, j) => (
              <Link href={subItem.link || ""} key={`${i}${j}`}>
                <MenuItem sx={{ ml: 2 }}>{t(subItem.name)}</MenuItem>
              </Link>
            ))}
          </Box>
        ))}
      </Menu>
    </>
  );
};

export default MobileMenuItems;
