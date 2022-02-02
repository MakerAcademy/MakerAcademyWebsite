import store from "@redux/store";
import "@styles/global.css";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { Provider } from "react-redux";
import { CssBaseline } from "@mui/material";
import CustomThemeProvider from "@contexts/themeContext";

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Provider store={store}>
          <CustomThemeProvider>
            <CssBaseline />
            <Component {...pageProps} />
          </CustomThemeProvider>
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
