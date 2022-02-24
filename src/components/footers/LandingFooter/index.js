import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import withAppConfig from "@hoc/withAppConfig";
import Link from "next/link";
import DaiIcon from "@components/DaiIcon";

const footerItems = [
  {
    title: "Resources",
    items: [
      { name: "Whitepaper", link: "#" },
      { name: "FAQs", link: "#" },
      { name: "Brand Asswts", link: "#" },
      { name: "Feeds", link: "#" },
      { name: "Service Status", link: "#" },
    ],
  },
  {
    title: "Products",
    items: [
      { name: "Migrate", link: "#" },
      { name: "Ecosystem", link: "#" },
      { name: "Governance", link: "#" },
    ],
  },
  {
    title: "Developers",
    items: [
      { name: "Documentation", link: "#" },
      { name: "Dai.js", link: "#" },
      { name: "Developer Guides", link: "#" },
    ],
  },
];

const socials = [
  { icon: TwitterIcon, link: "#" },
  { icon: FacebookIcon, link: "#" },
  { icon: TelegramIcon, link: "#" },
  { icon: YouTubeIcon, link: "#" },
  { icon: MusicNoteIcon, link: "#" },
  { icon: LinkedInIcon, link: "#" },
];

const LandingFooter = ({ appConfig }) => {
  const theme = useTheme();

  const BusinessCard = () => (
    <>
      <a target="_blank" href="http://makerdao.com/" rel="noopener noreferrer">
        <Box sx={{ height: 75, cursor: "pointer" }}>
          <DaiIcon name="maker_color" />
        </Box>
      </a>

      <Typography variant="body2" sx={{ maxWidth: 300 }}>
        Lorem ipsum dolor sit amet,consectetur adipisicing elit. Quis non, fugit
        totam vel laboriosam vitae.
      </Typography>
    </>
  );

  const ContactSocials = () => (
    <Stack spacing={{ xs: 2, md: 4 }}>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: 18,
        }}
      >
        Subscribe
      </Typography>

      <Stack direction="row">
        <TextField
          variant="outlined"
          fullWidth
          placeholder="info@yourgmail.com"
          sx={{ height: 55 }}
          InputProps={{
            sx: {
              borderRadius: "10px",
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              fontSize: 14,
              fontWeight: 300,
            },
          }}
        />
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            backgroundColor: theme.palette.primary.main,
            width: 60,
            height: 53,
            borderRadius: "10px",
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            cursor: "pointer",
          }}
        >
          <SendIcon sx={{ color: theme.palette.primary.white }} />
        </Stack>
      </Stack>

      <Stack direction="row" spacing={1} justifyContent="space-between">
        {socials.map((item, i) => (
          <Box
            key={i}
            sx={{
              height: 40,
              width: 40,
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              "&:hover": {
                color: theme.palette.primary.main,
              },
            }}
          >
            <item.icon />
          </Box>
        ))}
      </Stack>
    </Stack>
  );

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.darker,
        py: { xs: 6, md: 8 },
        px: 4,
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={{ xs: 3, md: 5, lg: 8 }}
          justifyContent="space-between"
        >
          <Grid item xs={12} md={3}>
            <BusinessCard />
          </Grid>

          {footerItems.map((items, i) => (
            <Grid item xs={12} md={2} key={i}>
              <Typography
                sx={{
                  fontWeight: 600,
                  mb: { xs: 1.5, md: 3 },
                  fontSize: 18,
                }}
              >
                {items.title}
              </Typography>

              {items.items.map((item, i) => (
                <Typography
                  key={i}
                  sx={{
                    mb: { xs: 0.7, md: 2 },
                    letterSpacing: 0.1,
                    cursor: "pointer",
                    "&:hover": {
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  {item.name}
                </Typography>
              ))}
            </Grid>
          ))}

          <Grid item xs={12} md={3}>
            <ContactSocials />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default withAppConfig(LandingFooter);
