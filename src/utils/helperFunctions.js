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

export const flattenChildren = (text, child) => {
  return typeof child === "string"
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
};
