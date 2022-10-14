/* eslint-disable @next/next/no-page-custom-font */
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { SWRConfig } from "swr";
import "tippy.js/dist/tippy.css";
import Layout from "../components/Layout";
import { description, keywords } from "../components/seo";
import { store } from "../redux/store";
import "../styles/globals.css";
import fetchData from "../utils/fetchData";

export let appBaseUrl = "https://playon.vercel.app/";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
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

        <meta
          name="google-site-verification"
          content="kFXzOWt-zLMwRqqGlPyUXKTworDZrhWV0Oh7_8pMdno"
        />

        <meta
          key="twitter:card"
          name="twitter:card"
          content="summary_large_image"
        />
        <meta key="twitter:site" name="twitter:site" content="@playon" />
        <meta
          key="twitter:description"
          name="twitter:description"
          content={description}
        />
        <meta
          key="twitter:image"
          name="twitter:image"
          content={`${appBaseUrl}android-chrome-512x512.png`}
        />

        <meta
          key="twitter:creator"
          name="twitter:creator"
          content="@perfume-express"
        />
        <meta
          key="og:url"
          property="og:url"
          content={`${appBaseUrl}${router.pathname}`}
        />
        <meta key="og:type" property="og:type" content="article" />
        <meta
          key="og:description"
          property="og:description"
          content={description}
        />
        <meta
          key="og:image"
          property="og:image"
          content={`${appBaseUrl}android-chrome-512x512.png`}
        />

        <meta name="keywords" content={keywords} />

        <meta name="description" content={description}></meta>

        <meta
          name="title"
          content="Welcome to perfumeexpress.vercel.app  -Best designer perfumes online sales in Nigeria: perfumeexpress.vercel.app"
        ></meta>
        <meta
          name="google-site-verification"
          content="kFXzOWt-zLMwRqqGlPyUXKTworDZrhWV0Oh7_8pMdno"
        />
        <link rel="canonical" href={appBaseUrl} />
        <meta name="robots" content="INDEX,FOLLOW"></meta>
        <meta property="og:title" content="Perfume Express" />
        <meta property="og:description" content={description} />
        <meta property="og:URL" content={appBaseUrl} />
        <meta property="og:type" content="website" />
      </Head>
      <SWRConfig
        value={{
          fetcher: async (url) => await fetchData(url),
        }}
      >
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </SWRConfig>
    </>
  );
}

export default MyApp;
