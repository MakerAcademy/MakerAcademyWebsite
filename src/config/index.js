import LogoDark from "@assets/images/logo-dark.png";
import LogoLight from "@assets/images/logo-light.png";

const config = ({ mode }) => ({
  projectName: "Maker Academy",
  Logo: mode === "dark" ? LogoDark : LogoLight,
  LogoLight: LogoLight,
  LogoDark: LogoDark,
  menubar: {
    themeToggle: true,
    languages: false,
    authButtons: true,
    menuItems: [
      { name: "Contribute", link: "/" },
      { name: "Programs", link: "/" },
      { name: "Content", link: "/" },
    ],
  },
});

export default config;
