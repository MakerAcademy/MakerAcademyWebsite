import withAppConfig from "@hoc/withAppConfig";
import TranslateIcon from "@mui/icons-material/Translate";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { handleLanguageChange } from "@utils/helperFunctions";
import useTranslation from "next-translate/useTranslation";

const LanguageMenu = ({ appConfig, sx = {}, ...other }) => {
  const [langAnchor, setLangAnchor] = useState(null);

  const { t, lang } = useTranslation();

  const router = useRouter();
  const { pathname } = router;

  const { locales } = appConfig;

  return (
    <>
      <IconButton
        size="large"
        onClick={(e) => setLangAnchor(e.currentTarget)}
        color="inherit"
        sx={{ ...sx }}
        {...other}
      >
        <TranslateIcon />
      </IconButton>

      <Menu
        anchorEl={langAnchor}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(langAnchor)}
        onClose={() => setLangAnchor(null)}
        PaperProps={{ sx: { width: 135 } }}
      >
        {locales.map(({ code, name }) => (
          <MenuItem
            onClick={() => handleLanguageChange(code)}
            key={code}
            selected={code === lang}
          >
            {name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default withAppConfig(LanguageMenu);
