import { useTheme } from "@mui/material";
import { useSession } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import withAppConfig from "./withAppConfig";

const commonProps = (Component, options = {}) => {
  const ChildComponent = (props) => {
    const theme = useTheme();
    const { basic, translation = "common" } = options;

    const { data: session = {}, loading } = useSession();
    const { t, lang } = useTranslation(translation);

    const basicprops = {
      theme,
      t,
      lang,
      ...props,
    };

    if (basic) {
      return <Component {...basicprops} />;
    }

    return (
      <Component
        user={{
          authenticated: !!session?.profile?._id,
          ...(session?.session?.user || {}),
          ...(session?.profile || {}),
        }}
        userLoading={loading === "loading"}
        {...basicprops}
      />
    );
  };

  return withAppConfig(ChildComponent);
};

export default commonProps;
