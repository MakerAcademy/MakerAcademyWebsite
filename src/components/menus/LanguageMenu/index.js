import withAppConfig from "@hoc/withAppConfig";
import TranslateIcon from "@mui/icons-material/Translate";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { handleLanguageChange } from "@utils/helperFunctions";
import setLanguage from "next-translate/setLanguage";
import useTranslation from "next-translate/useTranslation";

const LanguageMenu = ({ appConfig }) => {
  const [langAnchor, setLangAnchor] = useState(null);

  const { t } = useTranslation();

  const router = useRouter();
  const { pathname } = router;

  const { locales } = appConfig;

  return (
    <>
      <IconButton
        size="large"
        onClick={(e) => setLangAnchor(e.currentTarget)}
        color="inherit"
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
      >
        {locales.map((lang) => (
          <MenuItem
            onClick={() => handleLanguageChange(lang, setLanguage)}
            key={lang}
          >
            {t(`common:${lang}`)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default withAppConfig(LanguageMenu);
