import { createTheme } from "@mui/material";
import makerTheme from "@makerdao/dai-ui-theme-maker-neue";
import commonColors from "./commonColors";
import typography from "./typography";
import { grey } from "@mui/material/colors";

const colors = {
  ...commonColors,
  ...makerTheme.colors,
  inverse: grey[800],
};

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      ...colors,
      main: "#1AAB9B",
      emphasis: "#008E7B",
      alt: "#087C6D",
      muted: "#EEFFFD",
      onPrimary: "#FFF",
    },
    secondary: {
      ...colors,
      main: "#D5D9E0",
      emphasis: "#7E7E87",
      alt: "#231536",
      muted: "#D4D9E1",
      onSecondary: "#7E7E88",
    },
    background: {
      ...colors,
      default: "#F4F6F8",
      alt: "#FFFFFF",
      onBackground: "#F5F5F5",
    },
    surface: {
      ...colors,
      default: "#FFF",
      onSurface: "#708390",
    },
    muted: {
      ...colors,
      default: "#D5D9E0",
      alt: "#7E7E87",
    },
    error: {
      ...colors,
      default: "#D32F2F",
      main: "#D32F2F",
    },
    success: {
      ...colors,
      default: "#2E7D32",
      main: "#2E7D32",
      alt: "#81c784",
      onSuccess: "#2E7D32",
    },
    notice: {
      ...colors,
      default: "#0288D1",
      main: "#0288D1",
      alt: "#4fc3f7",
      onNotice: "#0288D1",
    },
    warning: {
      ...colors,
      default: "#ED6C02",
      main: "#ED6C02",
      alt: "#694005",
      onWarning: "#ED6C02",
    },
    accent: {
      ...colors,
      blue: "#447AFB",
      purle: "#9055AF",
    },
    text: {
      ...colors,
      default: "#000",
      primary: "#000",
    },
  },
  typography,
});
