/* eslint-disable @next/next/no-page-custom-font */
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { SWRConfig } from "swr";
import "tippy.js/dist/tippy.css";
import Layout from "../components/Layout";
import { store } from "../redux/store";
import "../styles/globals.css";
import fetchData from "../utils/fetchData";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: async (url) => await fetchData(url),
      }}
    >
      <Provider store={store}>
        <Layout>
          <Head>
            <link rel="icon" href="/android-chrome-512x512.png" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin="true"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Ubuntu&display=swap"
              rel="stylesheet"
            />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SWRConfig>
  );
}

export default MyApp;
