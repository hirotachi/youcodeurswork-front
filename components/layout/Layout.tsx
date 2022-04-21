import React, { PropsWithChildren } from "react";
import styles from "@modules/Layout.module.scss";
import Header from "./Header";
import Footer from "./Footer";

const Layout: PropsWithChildren<any> = (props) => {
  const { children } = props;
  return (
    <div className={styles.layout}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
