import LogoDark from "@assets/images/logo-dark.png";
import LogoLight from "@assets/images/logo-light.png";

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
      { name: "Contribute", link: "/contribute" },
      { name: "Programs", link: "/programs" },
      { name: "Content", link: "/content" },
    ],
  },
});

export default config;
