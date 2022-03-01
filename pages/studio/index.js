import RoundedButton from "@components/buttons/RoundedButton";
import AboutSidebar from "@components/sidebars/AboutSidebar";
import { withProtectedUser } from "@hoc/routes";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
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
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const studioRoutes = [
  {
    name: "creator_studio_dashboard",
    value: "/studio",
    icon: DashboardIcon,
  },
  {
    name: "creator_studio_content",
    value: "/studio/content",
    icon: VideoLibraryIcon,
  },
  {
    name: "creator_studio_analytics",
    value: "/studio/analytics",
    icon: AnalyticsIcon,
  },
];

const PageRenderer = ({ type, ...other }) => {
  const page = {
    "/studio": dynamic(() => import("@pages/Studio/Dashboard")),
    "/studio/dashboard": dynamic(() => import("@pages/Studio/Dashboard")),
    "/studio/content": dynamic(() => import("@pages/Studio/Content")),
    "/studio/analytics": dynamic(() => import("@pages/Studio/Analytics")),
  };

  const RenderedPage = page[type];

  return <RenderedPage {...other} />;
};

const CreatorStudio = (props) => {
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
              menuItems={studioRoutes}
              page={page}
              setPage={setPage}
            />
          </Hidden>

          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: "100%" }}
          >
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
              Creator Studio
            </Typography>

            <RoundedButton href="/studio/new">Add New</RoundedButton>
          </Stack>
        </Stack>

        <Hidden mdDown>
          <Tabs
            value={page}
            onChange={(e, v) => setPage(v)}
            variant="scrollable"
            scrollButtons="auto"
          >
            {studioRoutes.map((item, i) => (
              <Tab
                key={i}
                label={item.name}
                value={item.value}
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
          <PageRenderer type={page} {...props} />
        </Box>
      </Stack>
    </Container>
  );
};

export default CreatorStudio;

export const getServerSideProps = withProtectedUser();
