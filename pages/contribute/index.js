import ResponsiveText from "@components/ResponsiveText";
import Sidebar from "@components/sidebars/Sidebar";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";

const SIDEBAR_ITEMS = [
  {
    name: "contributor_directory",
    link: "/contribute/directory",
    shallow: true,
  },
  {
    name: "contributor_pipelines",
    // link: "/contribute/pipeline",
    shallow: true,
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

const PageRenderer = ({ type, ...other }) => {
  const page = {
    "/contribute/directory": dynamic(() =>
      import("@pages/Contribute/ContributeDirectory")
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
  const { asPath } = useRouter();
  const [url, setUrl] = useState(asPath);

  useEffect(() => {
    setUrl(asPath);
  }, [asPath]);

  return (
    <Box>
      <Stack sx={{ py: 5, px: { xs: 3, md: 5 } }} spacing={1}>
        <ResponsiveText variant="h3">Contribute</ResponsiveText>

        <Sidebar title="Contributor" intlNames items={SIDEBAR_ITEMS} />
      </Stack>

      <Divider />

      <Container maxWidth="xl" sx={{ minHeight: "50vh", py: 5 }}>
        <PageRenderer type={url} />
      </Container>
    </Box>
  );
};

export default ContributePage;
