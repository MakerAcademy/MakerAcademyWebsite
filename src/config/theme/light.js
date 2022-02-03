import { createTheme } from "@mui/material";
import makerTheme from "@makerdao/dai-ui-theme-maker-neue";
import commonColors from "./commonColors";
import typography from "./typography";

const colors = {
  ...commonColors,
  ...makerTheme.colors,
};

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2BB7A7",
      ...colors,
    },
    background: {
      default: "#fff",
      ...colors,
    },
    text: {
      primary: "#222222",
    },
  },
  typography,
});

/*
"text": "#434358",
"primary": "#1AAB9B",
"primaryEmphasis": "#008E7B",
"primaryAlt": "#087C6D",
"primaryMuted": "#EEFFFD",
"onPrimary": "#FFF",
"secondary": "#D5D9E0",
"secondaryEmphasis": "#7E7E87",
"secondaryAlt": "#231536",
"secondaryMuted": "#D4D9E1",
"onSecondary": "#7E7E88",
"background": "#F7F8F9",
"onBackground": "#434358",
"onBackgroundAlt": "#231536",
"surface": "#FFF",
"onSurface": "#708390",
"muted": "#D5D9E0",
"mutedAlt": "#7E7E87",
"error": "#AE3C4B",
"success": "#087C6D",
"successAlt": "#EEFFFD",
"onSuccess": "#087C6D",
"notice": "#EB7720",
"noticeAlt": "#FFFBEF",
"onNotice": "#EB7720",
"warning": "#CB532D",
"warningAlt": "#FFF6F3",
"onWarning": "#CB532D",
"accentBlue": "#447AFB",
"accentPurple": "#9055AF"
*/
