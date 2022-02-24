import React from "react";
// import { icons } from "@makerdao/dai-ui-icons";
import { icons as brandIcons } from "@makerdao/dai-ui-icons-branding";
import { Box, SvgIcon } from "@mui/material";

const DaiIcon = ({
  name,
  type = "icon",
  fontSize = 40,
  size,
  sx = {},
  ...props
}) => {
  const icon = brandIcons[name]?.path;

  return (
    <SvgIcon
      sx={{
        height: size === "auto" ? "100%" : "inherit",
        width: size === "auto" ? "100%" : "inherit",
        fontSize,
        ...sx,
      }}
      {...props}
    >
      {icon}
    </SvgIcon>
  );
};

export default DaiIcon;
