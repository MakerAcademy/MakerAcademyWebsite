import DiscordIcon from "@assets/icons/discord-brand.svg";
import DaiIcon from "@components/DaiIcon";
import withAppConfig from "@hoc/withAppConfig";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { aboutRoutes } from "pages/about-us";
import React from "react";

const socials = [
  { icon: TwitterIcon, link: "#", color: "#00acee" },
  { icon: YouTubeIcon, link: "#", color: "#c4302b" },
  { icon: LinkedInIcon, link: "#", color: "#0e76a8" },
  { svg: DiscordIcon, link: "#" },
];

const LandingFooter = ({ appConfig }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box sx={{ py: { xs: 6, md: 8 }, px: 4 }}>
      <Stack alignItems="center" justifyContent="center" spacing={2}>
        <Typography variant="h5" sx={{ pb: 2 }}>
          Appendix
        </Typography>

        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
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

        <Stack direction={{ xs: "column", md: "row" }} spacing={1}>
          {socials.map((item, i) => (
            <Link href={item.link} key={i} passHref>
              <IconButton>
                {item.icon && <item.icon sx={{ color: item.color }} />}

                {item.svg && (
                  <img
                    src={item.svg}
                    alt="Discord"
                    style={{
                      height: 26,
                      width: 27,
                      objectFit: "contain",
                      filter: isDark ? "invert(0.9)" : "invert(0.2)",
                    }}
                  />
                )}
              </IconButton>
            </Link>
          ))}
        </Stack>

        <a
          target="_blank"
          href="http://makerdao.com/"
          rel="noopener noreferrer"
        >
          <Box sx={{ height: 65, cursor: "pointer" }}>
            <DaiIcon name="maker_color" />
          </Box>
        </a>
      </Stack>
    </Box>
  );
};

export default withAppConfig(LandingFooter);
