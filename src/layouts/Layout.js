import withAppConfig from "@hoc/withAppConfig";
import LandingLayout from "@layouts/LandingLayout";
import { useRouter } from "next/router";
import React from "react";

const EmptyLayout = ({ children }) => (
  <React.Fragment>{children}</React.Fragment>
);

const Layout = ({ children, appConfig }) => {
  const router = useRouter();
  const { pathname } = router;

  const { noLayoutRoutes } = appConfig;

  const DynamicLayout = noLayoutRoutes.includes(pathname)
    ? EmptyLayout
    : LandingLayout;

  return <DynamicLayout>{children}</DynamicLayout>;
};

export default withAppConfig(Layout);
