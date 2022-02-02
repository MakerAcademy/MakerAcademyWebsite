import React from "react";
import LandingLayout from "@layouts/LandingLayout";
import { useRouter } from "next/router";
import withAppConfig from "@hoc/withAppConfig";

const Layout = ({ children, appConfig }) => {
  const router = useRouter();
  const { pathname } = router;

  const { landingLayoutRoutes } = appConfig;

  const DynamicLayout = landingLayoutRoutes.includes(pathname)
    ? LandingLayout
    : LandingLayout; //DashboardLayout - change when dashboard layout is ready

  return <DynamicLayout>{children}</DynamicLayout>;
};

export default withAppConfig(Layout);
