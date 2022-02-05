import React from "react";
import LandingLayout from "@layouts/LandingLayout";
import { useRouter } from "next/router";
import withAppConfig from "@hoc/withAppConfig";

const EmptyLayout = ({ children }) => (
  <React.Fragment>{children}</React.Fragment>
);

const Layout = ({ children, appConfig }) => {
  const router = useRouter();
  const { pathname } = router;

  const { landingLayoutRoutes, noLayoutRoutes } = appConfig;

  const DynamicLayout = noLayoutRoutes.includes(pathname)
    ? EmptyLayout
    : landingLayoutRoutes.includes(pathname)
    ? LandingLayout
    : LandingLayout; //DashboardLayout - change when dashboard layout is ready

  return <DynamicLayout>{children}</DynamicLayout>;
};

export default withAppConfig(Layout);
