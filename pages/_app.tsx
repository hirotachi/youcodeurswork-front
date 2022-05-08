import type { AppProps } from "next/app";
import "react-trumbowyg/dist/trumbowyg.min.css";
import "@styles/styles.scss";
import Layout from "@components/layout/Layout";
import React from "react";
import { Provider } from "use-http";

function MyApp({ Component, pageProps }: AppProps) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  return (
    <Provider url={apiUrl}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
