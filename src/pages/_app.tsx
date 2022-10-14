/* eslint-disable @next/next/no-page-custom-font */
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { SWRConfig } from "swr";
import "tippy.js/dist/tippy.css";
import Layout from "../components/Layout";
import { store } from "../redux/store";
import "../styles/globals.css";
import fetchData from "../utils/fetchData";

export let description = "perfumeexpress.vercel.app is the leading online perfume shop for original designer perfumes, beauty, body care and fragrance sales in Nigeria. Enjoy 24 hours FREE delivery in Lagos, 2 to 3 days delivery in other states in Nigeria. Buy top perfume and beauty care at best prices and deals online in Nigeria at perfumeexpress.vercel.app";
export let keywords = "perfumeexpress.vercel.app, perfumexpress_ @perfumexpress_ Nigeria's original perfume shop, online  store for best designer perfumes in Nigeria, perfume oil, best perfume for men,best perfume,pebest perfume, designer perfume,best smells perfume, versace perfume,24k perfume,212 perfume,names of perfume,designers perfume,explorer perfume,coco chanel perfume,types of perfume,gucci perfume, buy beauty care, body care products,buy perfumes and fragrances for men, women, unisex and children perfumes, scents, authentic, designer,perfume scent,perfume online,best scent,perfume sale online,strong perfumes, designer perfume sale,best sale on perfume,perfumes best prices,perfume products,best smelling designer perfume,best perfume sales,ng perfume, perfumes in nigeria,can perfume, best perfume in nigeria,best perfume online,scent online, designer perfumes in nigeria, the best designer perfume, the perfume sale,best perfume sale online,scent best,best perfume design,perfume best perfume,ng perfume price, perfumes products,best online perfume sales, best best perfume,perfume deals in Nigeria";
export let appBaseUrl = "https://playon.vercel.app/"



function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
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

            <meta
              name="google-site-verification"
              content="kFXzOWt-zLMwRqqGlPyUXKTworDZrhWV0Oh7_8pMdno"
            />

            <meta
              key="twitter:card"
              name="twitter:card"
              content="summary_large_image"
            />
            <meta
              key="twitter:site"
              name="twitter:site"
              content="@playon"
            />
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

            <meta
              name="keywords"
              content={keywords}
            />

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
            <meta
              property="og:URL"
              content={appBaseUrl}
            />
            <meta property="og:type" content="website" />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SWRConfig>
  );
}

export default MyApp;
