import { Brightness4, Brightness7 } from "@mui/icons-material";
import { IconButton, useTheme } from "@mui/material";
import React, { useContext } from "react";
import { ThemeContext } from "@contexts/themeContext";
import { DARK_MODE, LIGHT_MODE } from "@constants/theme";

const ThemeToggleButton = () => {
  const theme = useTheme();
  const setThemeName = useContext(ThemeContext);

  return (
    <IconButton
      // sx={{ color: theme.palette.primary.white }}
      onClick={() =>
        setThemeName(theme.palette.mode === DARK_MODE ? LIGHT_MODE : DARK_MODE)
      }
    >
      {theme.palette.mode === DARK_MODE ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};

export default ThemeToggleButton;
