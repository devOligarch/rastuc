import "@/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/nprogress/styles.css";
import "@mantine/spotlight/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/dates/styles.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "@mantine/notifications/styles.css";
import { SessionProvider } from "next-auth/react";
import { createTheme, MantineProvider } from "@mantine/core";
import { NavigationProgress } from "@mantine/nprogress";

import { InstantSearch } from "react-instantsearch";
import algoliasearch from "algoliasearch/lite";

import { withUrqlClient } from "next-urql";
import { Notifications } from "@mantine/notifications";
import Head from "next/head";

const theme = createTheme({
  fontFamily: "EudoxusSans",
});

const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_SEARCH_API
);

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    // <InstantSearch searchClient={searchClient} indexName="shwariphones">
    <SessionProvider session={session}>
      <MantineProvider theme={theme}>
        <Head>
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <title>Rastuc</title>
          <meta name="description" content="Empowering lives" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="mask-icon" href="/icons/mask-icon.svg" color="#FFFFFF" />
          <meta name="theme-color" content="#000" />
          <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/icons/touch-icon-ipad.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icons/touch-icon-iphone-retina.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="167x167"
            href="/icons/touch-icon-ipad-retina.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://yourdomain.com" />
          <meta name="twitter:title" content="My awesome PWA app" />
          <meta
            name="twitter:description"
            content="Best PWA app in the world!"
          />
          <meta name="twitter:image" content="/icons/twitter.png" />
          <meta name="twitter:creator" content="@DavidWShadow" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="My awesome PWA app" />
          <meta
            property="og:description"
            content="Best PWA app in the world!"
          />
          <meta property="og:site_name" content="My awesome PWA app" />
          <meta property="og:url" content="https://yourdomain.com" />
          <meta property="og:image" content="/icons/og.png" />
          {/* add the following only if you want to add a startup image for Apple devices. */}
          <link
            rel="apple-touch-startup-image"
            href="/images/apple_splash_2048.png"
            sizes="2048x2732"
          />
          <link
            rel="apple-touch-startup-image"
            href="/images/apple_splash_1668.png"
            sizes="1668x2224"
          />
          <link
            rel="apple-touch-startup-image"
            href="/images/apple_splash_1536.png"
            sizes="1536x2048"
          />
          <link
            rel="apple-touch-startup-image"
            href="/images/apple_splash_1125.png"
            sizes="1125x2436"
          />
          <link
            rel="apple-touch-startup-image"
            href="/images/apple_splash_1242.png"
            sizes="1242x2208"
          />
          <link
            rel="apple-touch-startup-image"
            href="/images/apple_splash_750.png"
            sizes="750x1334"
          />
          <link
            rel="apple-touch-startup-image"
            href="/images/apple_splash_640.png"
            sizes="640x1136"
          />
        </Head>
        <Notifications />
        <NavigationProgress color="red" initialProgress={20} />
        <main>
          <Component {...pageProps} />
        </main>
      </MantineProvider>
    </SessionProvider>
    // </InstantSearch>
  );
}

export default withUrqlClient((_ssrExchange, ctx) => ({
  // ...add your Client options here
  url: process.env.NEXT_PUBLIC_BACKEND_URL,
}))(App);
