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
  url: process.env.NEXT_PUBLIC_SERVER_REMOTE,
}))(App);
