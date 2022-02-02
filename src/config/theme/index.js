import { darkTheme } from "./dark";
import { lightTheme } from "./light";

export function themeCreator(theme) {
  return themeMap[theme];
}

const themeMap = {
  light: lightTheme,
  dark: darkTheme,
};

export default themeCreator("dark");
