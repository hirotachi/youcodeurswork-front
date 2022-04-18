import type { AppProps } from "next/app";
import "react-trumbowyg/dist/trumbowyg.min.css";
import "@styles/styles.scss";
import Layout from "@components/layout/Layout";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
