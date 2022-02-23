module.exports = {
  locales: ["en", "fr", "es", "ru", "ar", "zh", "hi", "sw"],
  defaultLocale: "en",
  pages: {
    "*": ["common"],
    "/": ["home"],
    "rgx:^/contribute": ["contribute"],
    "rgx:^/studio": ["creator-studio"],
  },
  loadLocaleFrom: (lang, ns) =>
    import(`./locales/${lang}/${ns}.json`).then((m) => m.default),
};
