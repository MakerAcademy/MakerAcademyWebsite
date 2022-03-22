module.exports = {
  locales: ["en", "fr", "es", "ru", "ar", "zh", "hi", "sw"],
  defaultLocale: "en",
  pages: {
    "*": ["common"],
    "/": ["home"],
    "rgx:^/contribute": ["contribute"],
    "rgx:^/studio": ["creator-studio"],
    "rgx:^/account": ["account"],
    "rgx:^/program": ["programs"],
    "rgx:^/content": ["content"],
    "rgx:^/about-us": ["about-us"],
  },
  loadLocaleFrom: (lang, ns) =>
    import(`./locales/${lang}/common.json`).then((c) => {
      const common = { ...c.default };
      return import(`./locales/${lang}/${ns}.json`).then((m) => ({
        ...common,
        ...m.default,
      }));
    }),
};
