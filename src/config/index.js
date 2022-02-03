import { LogoDark, LogoLight } from "@utils/images";

const config = ({ mode }) => ({
  projectName: "Maker Academy",
  logo: mode === "dark" ? LogoDark : LogoLight,
  logoLight: LogoLight,
  logoDark: LogoDark,
  locales: ["en", "fr"],
  landingLayoutRoutes: ["/", "/login", "/register"],
  navbar: {
    themeToggle: true,
    languagePopup: true,
    authButtons: true,
    menuItems: [
      { name: "Home", link: "/" },
      {
        name: "Contribute",
        link: "/contribute",
        nestedItems: [
          { name: "1", link: "/" },
          { name: "2", link: "/" },
          { name: "3", link: "/" },
        ],
      },
      {
        name: "Programs",
        link: "/programs",
        nestedItems: [
          { name: "1", link: "/" },
          { name: "2", link: "/" },
          { name: "3", link: "/" },
        ],
      },
      { name: "Content", link: "/content" },
    ],
  },
});

export default config;
