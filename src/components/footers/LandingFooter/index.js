import DiscordIcon from "@assets/icons/discord-brand.svg";
import withAppConfig from "@hoc/withAppConfig";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Box, Stack, Typography, useTheme, Link } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import { aboutRoutes } from "pages/about-us";
import React from "react";

const socials = [
  {
    label: "Twitter",
    icon: TwitterIcon,
    link: "https://twitter.com/MakerDAO",
    color: "#00acee",
  },
  {
    label: "Youtube",
    icon: YouTubeIcon,
    link: "https://www.youtube.com/MakerDAO",
    color: "#c4302b",
  },
  {
    label: "LinkedIn",
    icon: LinkedInIcon,
    link: "https://www.linkedin.com/company/makerdao/mycompany/",
    color: "#1f8cbf",
  },
  { label: "Discord", svg: DiscordIcon, link: "https://discord.gg/FTwZQJkbZr" },
];

const LandingFooter = ({ appConfig }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const { t } = useTranslation("common");

  return (
    <Box sx={{ py: 6, px: 4 }}>
      <Stack alignItems="center" justifyContent="center" spacing={2}>
        <Typography variant="h5" sx={{ pb: 4 }}>
          {t("appendix")}
        </Typography>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 3, md: 8 }}
        >
          {/* About Us */}
          <Box>
            <Link
              href="/about-us/mission-vision-strategy"
              color="inherit"
              underline="none"
            >
              <Typography variant="h6" sx={{ cursor: "pointer", mb: 2 }}>
                {t("about_us")}
              </Typography>
            </Link>

            <Stack
              spacing={{ xs: 2, md: 0 }}
              flexWrap="wrap"
              sx={{
                [theme.breakpoints.up("md")]: {
                  maxHeight: 170,
                  width: 400,
                },
              }}
            >
              {aboutRoutes.map((route, i) => (
                <Link
                  href={route.value}
                  key={i}
                  color="inherit"
                  underline="hover"
                  sx={{ [theme.breakpoints.up("md")]: { pb: 2 } }}
                >
                  <Typography
                    sx={{
                      cursor: "pointer",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    {t(route.label)}
                  </Typography>
                </Link>
              ))}
            </Stack>
          </Box>

          {/* Socials */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {t("socials")}
            </Typography>

            <Stack
              spacing={{ xs: 2, md: 0 }}
              flexWrap="wrap"
              sx={{
                [theme.breakpoints.up("md")]: {
                  maxHeight: 150,
                  width: 300,
                },
              }}
            >
              {socials.map((item, i) => (
                <Link
                  href={item.link}
                  target="_blank"
                  key={i}
                  color="inherit"
                  underline="hover"
                  sx={{ [theme.breakpoints.up("md")]: { pb: 2 } }}
                >
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <>
                      {item.icon && <item.icon sx={{ color: item.color }} />}

                      {item.svg && (
                        <img
                          src={item.svg}
                          alt="Discord"
                          style={{
                            height: 25,
                            width: 27.42,
                            objectFit: "contain",
                            filter: isDark ? "invert(0.9)" : "invert(0.2)",
                          }}
                        />
                      )}
                    </>

                    <Typography>{item.label}</Typography>
                  </Stack>
                </Link>
              ))}
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default withAppConfig(LandingFooter);
