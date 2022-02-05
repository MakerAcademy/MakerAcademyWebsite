import PageProvider from "@components/PageProvider/PageProvider";
import createEmotionCache from "@config/theme/createEmotionCache";
import Layout from "@layouts/Layout";
import { CssBaseline } from "@mui/material";
import store from "@redux/store";
import "@styles/global.css";
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
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </PageProvider>
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
