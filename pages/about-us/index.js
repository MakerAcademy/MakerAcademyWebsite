import AboutSidebar from "@components/sidebars/AboutSidebar";
import {
  Container,
  Divider,
  Hidden,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const aboutRoutes = [
  { label: "About", value: "/about-us" },
  { label: "Privacy Policy", value: "/about-us/privacy-policy" },
  { label: "Terms of Service", value: "/about-us/terms-of-service" },
  {
    label: "Mission, Vision, Strategy",
    value: "/about-us/mission-vision-strategy",
  },
  { label: "Budget", value: "/about-us/budget" },
  { label: "Improvement Proposals", value: "/about-us/imrovement-proposals" },
  { label: "Status Updates", value: "/about-us/status-updates" },
  { label: "Team", value: "/about-us/team" },
];

const PageRenderer = ({ type, ...other }) => {
  const page = {
    "/about-us": dynamic(() => import("@pages/AboutUs/AboutUs")),
    "/about-us/privacy-policy": dynamic(() =>
      import("@pages/AboutUs/PrivacyPolicy")
    ),
    "/about-us/terms-of-service": dynamic(() =>
      import("@pages/AboutUs/TermsOfService")
    ),
    "/about-us/mission-vision-strategy": dynamic(() =>
      import("@pages/AboutUs/MissionVisionStrategy")
    ),
    "/about-us/budget": dynamic(() => import("@pages/AboutUs/AboutUs")),
    "/about-us/imrovement-proposals": dynamic(() =>
      import("@pages/AboutUs/ImprovementProposals")
    ),
    "/about-us/status-updates": dynamic(() =>
      import("@pages/AboutUs/StatusUpdates")
    ),
    "/about-us/team": dynamic(() => import("@pages/AboutUs/Team")),
  };

  const RenderedPage = page[type];

  return <RenderedPage {...other} />;
};

const AboutUsPage = () => {
  const router = useRouter();

  const [page, setPage] = useState(router.asPath);

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  useEffect(() => {
    router.push(page, undefined, { shallow: true });
  }, [page]);

  return (
    <Container sx={{ py: { xs: 3, md: 8 } }} maxWidth="xl">
      <Stack spacing={3}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Hidden mdUp>
            <AboutSidebar
              menuItems={aboutRoutes}
              page={page}
              setPage={setPage}
            />
          </Hidden>

          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 600,
              [theme.breakpoints.up("md")]: {
                fontSize: 30,
                fontWeight: 600,
                ml: 2,
              },
            }}
          >
            About Us
          </Typography>
        </Stack>

        <Hidden mdDown>
          <Tabs
            value={page}
            onChange={(e, v) => setPage(v)}
            variant="scrollable"
            scrollButtons="auto"
          >
            {aboutRoutes.map((item, i) => (
              <Tab
                key={i}
                {...item}
                sx={{
                  textTransform: "inherit",
                  color: isDark ? grey[300] : grey[500],
                }}
              />
            ))}
          </Tabs>
        </Hidden>

        <Divider />

        <PageRenderer type={page} />
      </Stack>
    </Container>
  );
};

export default AboutUsPage;
