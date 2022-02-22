import { DARK_MODE } from "@constants/theme";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useTheme as useNextTheme } from "next-themes";
import React from "react";

const ThemeToggleButton = ({ sx = {}, iconSx = {}, ...other }) => {
  const { resolvedTheme, setTheme } = useNextTheme();

  return (
    <IconButton
      color="inherit"
      sx={{ ...sx }}
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      {...other}
    >
      {resolvedTheme === DARK_MODE ? (
        <Brightness7 sx={{ ...iconSx }} />
      ) : (
        <Brightness4 sx={{ ...iconSx }} />
      )}
    </IconButton>
  );
};

export default ThemeToggleButton;
