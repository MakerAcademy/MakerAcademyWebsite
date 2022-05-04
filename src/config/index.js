import { LogoDark, LogoLight } from "@utils/images";

const dev = process.env.NODE_ENV !== "production";

export const http = dev ? "http://" : "https://";

const config = ({ mode }) => ({
  projectName: "Maker Academy",
  logo: mode === "dark" ? LogoDark : LogoLight,
  logoLight: LogoLight,
  logoDark: LogoDark,
  locales: [
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
    { code: "es", name: "Español" },
    { code: "ru", name: "Pусский" },
    { code: "ar", name: "العربية" },
    { code: "zh", name: "中文" },
    { code: "hi", name: "हिन्दी" },
    { code: "sw", name: "Kiswahili" },
  ],
  noLayoutRoutes: ["/sign-in", "/sign-up"], //"/studio", "/studio/[page]"
  navbar: {
    themeToggle: true,
    languagePopup: true,
    authButtons: true,
    menuItems: [
      { name: "content", link: "/content" },
      // {
      //   name: "programs",
      //   link: "/programs",
      // },
      {
        name: "contribute",
        link: "/contribute",
      },
    ],
  },
});

export default config;
