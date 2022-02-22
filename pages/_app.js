import PageProvider from "@components/PageProvider/PageProvider";
import createEmotionCache from "@config/theme/createEmotionCache";
import Layout from "@layouts/Layout";
import { CssBaseline } from "@mui/material";
import store from "@redux/store";
import "@styles/global.css";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { Provider } from "react-redux";
import { handleLanguageChange } from "@utils/helperFunctions";
import appWithI18n from "next-translate/appWithI18n";
import i18nConfig from "@i18n";
import { CommonContextProvider } from "@context/commonContext";
import { SessionProvider } from "next-auth/react";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) {
  const queryClient = new QueryClient();

  const { lang } = useTranslation();

  // useEffect(() => {
  //   if (!lang) {
  //     console.log("IN");
  //     handleLanguageChange("fr");
  //   }
  // }, []);

  return (
    <SessionProvider session={pageProps.session}>
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Provider store={store}>
          <PageProvider emotionCache={emotionCache}>
            <CommonContextProvider>
              <CssBaseline />
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </CommonContextProvider>
          </PageProvider>
        </Provider>
      </Hydrate>
    </QueryClientProvider>
    </SessionProvider>
  );
}

export default appWithI18n(MyApp, { ...i18nConfig });
