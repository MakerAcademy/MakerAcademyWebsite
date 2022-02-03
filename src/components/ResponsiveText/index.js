import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React from "react";
import typography from "@config/theme/typography";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const ResponsiveText = ({ children, variant = "body1", ...props }) => {
  return (
    <ThemeProvider theme={{ ...theme, typography }}>
      <Typography variant={variant} {...props}>
        {children}
      </Typography>
    </ThemeProvider>
  );
};

export default ResponsiveText;
