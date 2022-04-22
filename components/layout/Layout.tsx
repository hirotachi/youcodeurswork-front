import React, { PropsWithChildren } from "react";
import styles from "@modules/Layout.module.scss";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";
import InnerNav from "@components/InnerNav";

const Layout: PropsWithChildren<any> = (props) => {
  const { children } = props;
  const router = useRouter();
  const isLogin = router.pathname === "/login";
  const isHomes = router.pathname === "/jobs" || router.pathname === "/";
  return (
    <div className={styles.layout}>
      {!isLogin && <Header />}
      {!isLogin && isHomes && <InnerNav />}
      {children}
      {!isLogin && <Footer />}
    </div>
  );
};

export default Layout;
