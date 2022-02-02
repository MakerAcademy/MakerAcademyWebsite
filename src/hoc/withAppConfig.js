import { useTheme } from "@mui/material";
import React, { createContext } from "react";
import config from "@config";

const AppConfigContext = createContext(null);

const withAppConfig = (Component) => {
  const ChildComponent = (props) => {
    const theme = useTheme();
    const mode = theme.palette.mode;

    return (
      <AppConfigContext.Consumer>
        {(value) => {
          const { appConfig } = value || {};
          return (
            <Component
              appConfig={{ ...config({ mode }), ...appConfig }}
              {...props}
            />
          );
        }}
      </AppConfigContext.Consumer>
    );
  };

  return ChildComponent;
};

export default withAppConfig;
