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

export const routes = [
  {
    label: "contributor_dashboard",
    value: "/contribute",
  },
  {
    label: "contributor_directory",
    value: "/contribute/directory",
  },
  {
    label: "grants_research",
    value: "/contribute/pipeline/grants-research",
  },
  {
    label: "bug_bounties",
    value: "/contribute/pipeline/bug-bounties",
  },
  {
    label: "core_unit_incubation",
    value: "/contribute/pipeline/core-unit-incubation",
  },
  {
    label: "education",
    value: "/contribute/pipeline/education",
  },
  {
    label: "onboarding",
    value: "/contribute/pipeline/onboarding",
  },
  {
    label: "enterprise_integration",
    value: "/contribute/pipeline/enterprise-integration",
  },
];

const PageRenderer = ({ type, ...other }) => {
  const page = {
    "/contribute": dynamic(() => import("@pages/Contribute/Dashboard")),
    "/contribute/directory": dynamic(() =>
      import("@pages/Contribute/Directory")
    ),
    "/contribute/pipeline": dynamic(() =>
      import("@pages/Contribute/GrantsResearch")
    ),
    "/contribute/pipeline/grants-research": dynamic(() =>
      import("@pages/Contribute/GrantsResearch")
    ),
    "/contribute/pipeline/bug-bounties": dynamic(() =>
      import("@pages/Contribute/BugBounties")
    ),
    "/contribute/pipeline/core-unit-incubation": dynamic(() =>
      import("@pages/Contribute/CoreUnitIncubation")
    ),
    "/contribute/pipeline/education": dynamic(() =>
      import("@pages/Contribute/Directory")
    ),
    "/contribute/pipeline/onboarding": dynamic(() =>
      import("@pages/Contribute/OnBoarding")
    ),
    "/contribute/pipeline/enterprise-integration": dynamic(() =>
      import("@pages/Contribute/EnterpriseIntegration")
    ),
  };

  const RenderedPage = page[type];

  return <RenderedPage {...other} />;
};

const ContributePage = () => {
  const router = useRouter();

  const { t } = useTranslation("contribute");

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
              title={"Contribute"}
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
            Contribute
            {/* {t("contribute")} */}
          </Typography>
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
          Coming Soon
          {/* <PageRenderer type={page} /> */}
        </Box>
      </Stack>
    </Container>
  );
};

export default ContributePage;
