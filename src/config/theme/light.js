import { createTheme } from "@mui/material";

const colors = {};

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#5142FC",
      ...colors,
    },
    background: {
      default: "#fff",
      ...colors,
    },
  },
});
