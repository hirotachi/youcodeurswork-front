import type { AppProps } from "next/app";
import "react-trumbowyg/dist/trumbowyg.min.css";
import "@styles/styles.scss";

import Layout from "@components/layout/Layout";
import { useEffect } from "react";
import $ from "jquery";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      Object.assign(window, {
        jQuery: $,
        $,
      });
    }
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
