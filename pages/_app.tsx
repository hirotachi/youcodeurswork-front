import type { AppProps } from "next/app";
import "react-trumbowyg/dist/trumbowyg.min.css";
import "@styles/styles.scss";
import Layout from "@components/layout/Layout";
import React from "react";
import AuthProvider from "@components/AuthProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
