import { Brightness4, Brightness7 } from "@mui/icons-material";
import { IconButton, useTheme } from "@mui/material";
import React, { useContext } from "react";
import { ThemeContext } from "@contexts/themeContext";
import { DARK_MODE, LIGHT_MODE } from "@constants/theme";

const ThemeToggleButton = ({ sx = {}, ...other }) => {
  const theme = useTheme();
  const setThemeName = useContext(ThemeContext);

  return (
    <IconButton
      color="inherit"
      sx={{ ...sx }}
      onClick={() =>
        setThemeName(theme.palette.mode === DARK_MODE ? LIGHT_MODE : DARK_MODE)
      }
      {...other}
    >
      {theme.palette.mode === DARK_MODE ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};

export default ThemeToggleButton;
