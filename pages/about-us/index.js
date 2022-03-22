import Sidebar from "@components/sidebars/Sidebar";
import {
  Box,
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
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export const aboutRoutes = [
  {
    label: "mission_vision_strategy",
    value: "/about-us/mission-vision-strategy",
  },
  { label: "budget", value: "/about-us/budget" },
  { label: "improvement_proposals", value: "/about-us/imrovement-proposals" },
  { label: "status_updates", value: "/about-us/status-updates" },
  { label: "team", value: "/about-us/team" },
  { label: "privacy_policy", value: "/about-us/privacy-policy" },
  { label: "terms_of_service", value: "/about-us/terms-of-service" },
];

const PageRenderer = ({ type, ...other }) => {
  const page = {
    "/about-us": dynamic(() => import("@pages/AboutUs/MissionVisionStrategy")),
    "/about-us/mission-vision-strategy": dynamic(() =>
      import("@pages/AboutUs/MissionVisionStrategy")
    ),
    "/about-us/budget": dynamic(() => import("@pages/AboutUs/Budget")),
    "/about-us/imrovement-proposals": dynamic(() =>
      import("@pages/AboutUs/ImprovementProposals")
    ),
    "/about-us/status-updates": dynamic(() =>
      import("@pages/AboutUs/StatusUpdates")
    ),
    "/about-us/team": dynamic(() => import("@pages/AboutUs/Team")),
    "/about-us/privacy-policy": dynamic(() =>
      import("@pages/AboutUs/PrivacyPolicy")
    ),
    "/about-us/terms-of-service": dynamic(() =>
      import("@pages/AboutUs/TermsOfService")
    ),
  };

  const RenderedPage = page[type];

  return <RenderedPage {...other} />;
};

const AboutUsPage = () => {
  const router = useRouter();

  const [page, setPage] = useState(router.asPath);

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const { t } = useTranslation("about-us");

  useEffect(() => {
    router.push(page, undefined, { shallow: true });
  }, [page]);

  return (
    <Container sx={{ py: { xs: 3, md: 8 } }} maxWidth="xl">
      <Stack spacing={3}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Hidden mdUp>
            <Sidebar
              menuItems={aboutRoutes}
              page={page}
              setPage={setPage}
              // t={t}
              title={t("about_us")}
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
            {t("about_us")}
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
                value={item.value}
                label={t(item.label)}
                sx={{
                  textTransform: "inherit",
                  color: isDark ? grey[300] : grey[500],
                }}
              />
            ))}
          </Tabs>
        </Hidden>

        <Divider />

        <Box sx={{ minHeight: "50vh" }}>
          <PageRenderer type={page} t={t} />
        </Box>
      </Stack>
    </Container>
  );
};

export default AboutUsPage;
