import { Button, Stack, useTheme } from "@mui/material";
import React from "react";

const RoundedButton = ({ children, sx = {}, icon, variant, ...props }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const getStyles = () => {
    const commonStyles = {
      textTransform: "inherit",
      borderRadius: 30,
      py: 1,
      px: 3,
      fontSize: 16,
    };

    switch (variant) {
      case "white":
        return {
          ...commonStyles,
          border: `2px solid ${theme.palette.primary.white}`,
          color: theme.palette.primary.white,
          "&:hover": {
            border: `2px solid ${theme.palette.primary.white}`,
            color: theme.palette.primary.black,
            backgroundColor: theme.palette.primary.white,
          },
        };

      default:
        return {
          ...commonStyles,
          backgroundColor: theme.palette.primary.main,
          border: `2px solid ${theme.palette.primary.main}`,
          color: isDark
            ? theme.palette.primary.black
            : theme.palette.primary.white,
          "&:hover": {
            border: `2px solid ${theme.palette.primary.main}`,
            color: !isDark
              ? theme.palette.primary.black
              : theme.palette.primary.white,
          },
        };
    }
  };

  return (
    <Button
      variant="outlined"
      sx={{
        ...getStyles(),
        ...sx,
      }}
      {...props}
    >
      {icon ? (
        <Stack direction="row" alignItems="center" spacing={1}>
          {icon} <span>{children}</span>
        </Stack>
      ) : (
        children
      )}
    </Button>
  );
};

export default RoundedButton;
