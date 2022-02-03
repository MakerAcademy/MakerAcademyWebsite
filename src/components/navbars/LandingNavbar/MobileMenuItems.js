import ThemeToggleButton from "@components/buttons/ThemeToggle";
import LanguageMenu from "@components/menus/LanguageMenu";
import { Box, IconButton, Menu, MenuItem, useTheme } from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";

const MobileMenuItems = ({
  themeToggle,
  menuItems,
  languagePopup,
  authButtons,
}) => {
  const [anchorEl, setAnchorEl] = useState();
  const theme = useTheme();

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
              <MenuItem>{item.name}</MenuItem>
            </Link>

            {item.nestedItems?.map((item2, j) => (
              <Link href={item.link || ""} key={`${i}${j}`}>
                <MenuItem sx={{ ml: 2 }}>{item2.name}</MenuItem>
              </Link>
            ))}
          </Box>
        ))}
      </Menu>
    </>
  );
};

export default MobileMenuItems;
