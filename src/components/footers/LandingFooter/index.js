import DiscordIcon from "@assets/icons/discord-brand.svg";
import withAppConfig from "@hoc/withAppConfig";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Box, Stack, Typography, useTheme, Link } from "@mui/material";
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

  return (
    <Box sx={{ py: 6, px: 4 }}>
      <Stack alignItems="center" justifyContent="center" spacing={2}>
        <Typography variant="h5" sx={{ pb: 1, borderBottom: "1px solid grey" }}>
          Appendix
        </Typography>

        <Link
          href="/about-us/mission-vision-strategy"
          color="inherit"
          underline="none"
          sx={{ pt: 2 }}
        >
          <Typography variant="h6" sx={{ cursor: "pointer" }}>
            About Us
          </Typography>
        </Link>

        <Stack
          spacing={2}
          direction={{ xs: "column", md: "row" }}
          sx={{ pb: 2 }}
        >
          {aboutRoutes.map((route, i) => (
            <Link href={route.value} key={i} color="inherit" underline="hover">
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

        <Link
          href="/about-us/mission-vision-strategy"
          color="inherit"
          underline="none"
        >
          <Typography variant="h6" sx={{ cursor: "pointer" }}>
            Socials
          </Typography>
        </Link>

        <Stack spacing={2} direction={{ xs: "column", md: "row" }}>
          {socials.map((item, i) => (
            <Link
              href={item.link}
              target="_blank"
              key={i}
              color="inherit"
              underline="hover"
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

        {/* <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 3, md: 8, lg: 15 }}
        >
          <Stack spacing={2}>
            <Link
              href="/about-us/mission-vision-strategy"
              color="inherit"
              underline="none"
            >
              <Typography variant="h6" sx={{ cursor: "pointer" }}>
                About Us
              </Typography>
            </Link>

            {aboutRoutes.map((route, i) => (
              <Link
                href={route.value}
                key={i}
                color="inherit"
                underline="hover"
              >
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
              <Link
                href={item.link}
                target="_blank"
                key={i}
                color="inherit"
                underline="hover"
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
        </Stack> */}
      </Stack>
    </Box>
  );
};

export default withAppConfig(LandingFooter);
