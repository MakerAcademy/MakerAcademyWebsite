import { LogoDark, LogoLight } from "@utils/images";

const config = ({ mode }) => ({
  projectName: "Maker Academy",
  logo: mode === "dark" ? LogoDark : LogoLight,
  logoLight: LogoLight,
  logoDark: LogoDark,
  locales: ["en", "fr"],
  noLayoutRoutes: [
    "/sign-in",
    "/sign-up",
    "/creator-studio",
    "/creator-studio/[page]",
  ],
  navbar: {
    themeToggle: true,
    languagePopup: true,
    authButtons: true,
    menuItems: [
      {
        name: "contribute",
        link: "/contribute",
        nestedItems: [
          { name: "1", link: "/" },
          { name: "2", link: "/" },
          { name: "3", link: "/" },
        ],
      },
      {
        name: "programs",
        link: "/programs",
        nestedItems: [
          { name: "1", link: "/" },
          { name: "2", link: "/" },
          { name: "3", link: "/" },
        ],
      },
      { name: "content", link: "/content" },
      { name: "about_us", link: "/about-us" },
    ],
  },
});

export default config;
