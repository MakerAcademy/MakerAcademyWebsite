import { ThemeProvider } from "@mui/material/styles";
import React, { createContext, useState } from "react";
import { themeCreator } from "@config/theme";
import { LIGHT_MODE, THEME_NAME } from "@constants/theme";

const DEFAULT_THEME = LIGHT_MODE;

export const ThemeContext = createContext({
  currentTheme: DEFAULT_THEME,
  setTheme: null,
});

const CustomThemeProvider = (props) => {
  // Read current theme from localStorage
  const curThemeName =
    typeof window !== "undefined"
      ? window?.localStorage?.getItem(THEME_NAME) || DEFAULT_THEME
      : DEFAULT_THEME;

  // State to hold the selected theme name
  const [themeName, _setThemeName] = useState(curThemeName);

  // Get the theme object by theme name
  const theme = themeCreator(themeName);

  const setThemeName = (themeName) => {
    localStorage.setItem(THEME_NAME, themeName);
    _setThemeName(themeName);
  };

  return (
    <ThemeContext.Provider value={setThemeName}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default CustomThemeProvider;
