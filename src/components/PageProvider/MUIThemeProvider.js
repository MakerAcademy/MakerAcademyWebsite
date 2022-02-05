import { globalStyles } from "@config/theme";
import { darkTheme } from "@config/theme/dark";
import { lightTheme } from "@config/theme/light";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const MUIThemeProvider = ({ children }) => {
  const { resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(darkTheme);

  useEffect(() => {
    resolvedTheme === "light"
      ? setCurrentTheme(lightTheme)
      : setCurrentTheme(darkTheme);
  }, [resolvedTheme]);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      {children}
    </ThemeProvider>
  );
};

export default MUIThemeProvider;
