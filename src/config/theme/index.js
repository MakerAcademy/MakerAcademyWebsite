import { css } from "@mui/material/styles";
import { darkTheme } from "./dark";
import { lightTheme } from "./light";

export function themeCreator(theme) {
  return themeMap[theme];
}

const themeMap = {
  light: lightTheme,
  dark: darkTheme,
};

export const globalStyles = css`
  :root {
    body {
      background-color: #fff;
      color: #121212;
    }
  }
  [data-theme="dark"] {
    body {
      background-color: #121212;
      color: #fff;
    }
  }
`;

export default themeCreator("dark");
