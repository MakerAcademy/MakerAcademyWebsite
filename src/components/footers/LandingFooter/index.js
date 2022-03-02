import DiscordIcon from "@assets/icons/discord-brand.svg";
import withAppConfig from "@hoc/withAppConfig";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import { aboutRoutes } from "pages/about-us";
import React from "react";

const socials = [
  { label: "Twitter", icon: TwitterIcon, link: "#", color: "#00acee" },
  { label: "Youtube", icon: YouTubeIcon, link: "#", color: "#c4302b" },
  { label: "LinkedIn", icon: LinkedInIcon, link: "#", color: "#1f8cbf" },
  { label: "Discord", svg: DiscordIcon, link: "#" },
];

const LandingFooter = ({ appConfig }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box sx={{ py: 6, px: 4 }}>
      <Stack alignItems="center" justifyContent="center" spacing={2}>
        <Typography variant="h5" sx={{ pb: 4 }}>
          Appendix
        </Typography>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 3, md: 8, lg: 15 }}
        >
          <Stack spacing={2}>
            <Link href="/about-us/mission-vision-strategy" passHref>
              <Typography variant="h6" sx={{ cursor: "pointer" }}>
                About Us
              </Typography>
            </Link>

            {aboutRoutes.map((route, i) => (
              <Link href={route.value} key={i} passHref>
                <Typography
                  sx={{
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {route.label}
                </Typography>
              </Link>
            ))}
          </Stack>

          <Stack spacing={2}>
            <Typography variant="h6">Socials</Typography>

            {socials.map((item, i) => (
              <Link href={item.link} key={i} passHref>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={0.5}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
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
        </Stack>
      </Stack>
    </Box>
  );
};

export default withAppConfig(LandingFooter);
