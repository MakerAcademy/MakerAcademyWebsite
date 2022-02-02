//Change App Language
export const handleLanguageChange = async (
  lang,
  setLanguage,
  router,
  pathname
) => {
  await setLanguage?.(lang);
  if (router && pathname) {
    await router.replace(pathname, pathname, { locale: lang });
  }

  return null;
};
