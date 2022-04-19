import ErrorBoundary from "@components/errors/ErrorBoundry";
import PageProvider from "@components/PageProvider/PageProvider";
import createEmotionCache from "@config/theme/createEmotionCache";
import { CommonContextProvider } from "@context/commonContext";
import i18nConfig from "@i18n";
import Layout from "@layouts/Layout";
import { CssBaseline } from "@mui/material";
import store from "@redux/store";
import "@styles/global.css";
import { SessionProvider } from "next-auth/react";
import appWithI18n from "next-translate/appWithI18n";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { Provider } from "react-redux";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Provider store={store}>
          <PageProvider emotionCache={emotionCache}>
            <SessionProvider session={pageProps.session} refetchInterval={0}>
              <ErrorBoundary>
                <CommonContextProvider>
                  <CssBaseline />
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </CommonContextProvider>
              </ErrorBoundary>
            </SessionProvider>
          </PageProvider>
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default appWithI18n(MyApp, { ...i18nConfig });
