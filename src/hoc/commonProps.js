import { useTheme } from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";
import withAppConfig from "./withAppConfig";

const commonProps = (Component) => {
  const ChildComponent = (props) => {
    const theme = useTheme();
    const { data: session, loading } = useSession();
    // const { t, lang } = useTranslation();

    return (
      <Component
        theme={theme}
        user={session?.user}
        userLoading={loading === "loading"}
        {...props}
      />
    );
  };

  return withAppConfig(ChildComponent);
};

export default commonProps;
