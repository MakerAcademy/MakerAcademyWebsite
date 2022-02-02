import { createTheme } from "@mui/material";

const colors = {};

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fff",
    },
    background: {
      default: "#14141F",
      ...colors,
    },
  },
});
