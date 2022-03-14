import RoundedButton from "@components/buttons/RoundedButton";
import Sidebar from "@components/sidebars/Sidebar";
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
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const routes = [
  {
    label: "admin_pending",
    value: "/admin/pending",
    icon: DashboardIcon,
  },
  {
    label: "admin_published",
    value: "/admin/published",
    icon: VideoLibraryIcon,
  },
  {
    label: "admin_users",
    value: "/admin/users",
    icon: AnalyticsIcon,
  },
];

const PageRenderer = ({ type, ...other }) => {
  const page = {
    "/admin": dynamic(() => import("@pages/Admin/Pending")),
    "/admin/pending": dynamic(() => import("@pages/Admin/Pending")),
    "/admin/published": dynamic(() => import("@pages/Admin/Published")),
    "/admin/users": dynamic(() => import("@pages/Admin/Users")),
  };

  const RenderedPage = page[type];

  return <RenderedPage {...other} />;
};

const Admin = (props) => {
  const router = useRouter();
  const { t } = useTranslation("admin");

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
            <Sidebar
              menuItems={routes}
              page={page}
              setPage={setPage}
              t={t}
              title={t("admin")}
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
                flex: 1,
                fontSize: 20,
                fontWeight: 600,
                [theme.breakpoints.up("md")]: {
                  fontSize: 30,
                  fontWeight: 600,
                  ml: 2,
                },
              }}
            >
              {t("admin")}
            </Typography>

            {/* <RoundedButton href="/admin/new-course">
              {t("add_new_course")}
            </RoundedButton> */}
          </Stack>
        </Stack>

        <Hidden mdDown>
          <Tabs
            value={page}
            onChange={(e, v) => setPage(v)}
            variant="scrollable"
            scrollButtons="auto"
          >
            {routes.map((item, i) => (
              <Tab
                key={i}
                label={t(item.label)}
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

export default Admin;

export const getServerSideProps = withProtectedUser(null, { trustLevel: 3 });
