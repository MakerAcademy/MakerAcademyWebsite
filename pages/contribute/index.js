import Sidebar from "@components/sidebars/Sidebar";
import { Box, Divider, Stack, Typography } from "@mui/material";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const SIDEBAR_ITEMS = [
  {
    name: "contributor_dashboard",
    link: "/contribute",
    shallow: true,
  },
  {
    name: "contributor_directory",
    link: "/contribute/directory",
    shallow: true,
  },
  {
    name: "contributor_pipelines",
    link: "/contribute/pipeline",
    disableButton: true,
    nestedItems: [
      {
        name: "grants_research",
        link: "/contribute/pipeline/grants-research",
        shallow: true,
      },
      {
        name: "bug_bounties",
        link: "/contribute/pipeline/bug-bounties",
        shallow: true,
      },
      {
        name: "core_unit_incubation",
        link: "/contribute/pipeline/core-unit-incubation",
        shallow: true,
      },
      {
        name: "education",
        link: "/contribute/pipeline/education",
        shallow: true,
      },
      {
        name: "onboarding",
        link: "/contribute/pipeline/onboarding",
        shallow: true,
      },
      {
        name: "enterprise_integration",
        link: "/contribute/pipeline/enterprise-integration",
        shallow: true,
      },
    ],
  },
];

const getTitle = (type, subType, asPath) => {
  const _default = "contributor_dashboard";

  if (subType) {
    const item = SIDEBAR_ITEMS.find((i) => i.link === `/contribute/${type}`);
    const subItem = item?.nestedItems?.find((i) => i.link === asPath);
    return subItem.name || _default;
  } else if (type && !subType) {
    const item = SIDEBAR_ITEMS.find((i) => i.link === `/contribute/${type}`);
    return item.name || _default;
  }
  return _default;
};

const PageRenderer = ({ type, ...other }) => {
  const page = {
    "/contribute": dynamic(() => import("@pages/Contribute/Dashboard")),
    "/contribute/directory": dynamic(() =>
      import("@pages/Contribute/Directory")
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
      import("@pages/Contribute/Education")
    ),
    "/contribute/pipeline/onboarding": dynamic(() =>
      import("@pages/Contribute/OnBoarding")
    ),
    "/contribute/pipeline/enterprise-integration": dynamic(() =>
      import("@pages/Contribute/EnterpriseIntegration")
    ),
  };

  if (page[type]) {
    const RenderedPage = page[type];
    return <RenderedPage {...other} />;
  }

  return <div>Not found</div>;
};

const ContributePage = () => {
  const { asPath, query } = useRouter();
  const [url, setUrl] = useState(asPath);
  const [title, setTitle] = useState("contributor_dashboard");

  const { type, subType } = query;

  const { t } = useTranslation("contribute");

  useEffect(() => {
    setTitle(getTitle(type, subType, asPath));
    setUrl(asPath);
  }, [asPath]);

  return (
    <Box>
      <Stack sx={{ py: 5, px: { xs: 2, md: 5 } }} spacing={2}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Sidebar title="contributor" intlNames items={SIDEBAR_ITEMS} />
          <Typography variant="h4">Contribute</Typography>
        </Stack>

        <Typography variant="h6">{t(title)}</Typography>
      </Stack>

      <Divider />

      <Box sx={{ minHeight: "50vh", py: 3, px: { xs: 3, md: 5 } }}>
        {/*<PageRenderer type={url} />*/}
        Coming Soon
      </Box>
    </Box>
  );
};

export default ContributePage;
