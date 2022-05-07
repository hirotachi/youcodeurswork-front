import React, { createContext, PropsWithChildren, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";
import InnerNav from "@components/InnerNav";
import SideNav from "@components/layout/SideNav";
import clsx from "clsx";
import styles from "@modules/layout/Layout.module.scss";
import { AnimatePresence } from "framer-motion";

type LayoutContextProps = {
  isSideNavOpen: boolean;
  setIsSideNavOpen: (isSideNavOpen: boolean) => void;
};
export const LayoutContext = createContext<LayoutContextProps>(null as any);

const Layout: PropsWithChildren<any> = (props) => {
  const { children } = props;
  const router = useRouter();
  const isLogin = router.pathname === "/login";
  const isHomes = router.pathname === "/jobs" || router.pathname === "/";
  const [isSideNavOpen, setIsSideNavOpen] = useState(true);
  return (
    <div className={clsx(styles.layout, isSideNavOpen && styles.open)}>
      <LayoutContext.Provider value={{ isSideNavOpen, setIsSideNavOpen }}>
        <AnimatePresence>
          <div className={styles.side} onClick={() => setIsSideNavOpen(false)}>
            {isSideNavOpen && <SideNav />}
          </div>
        </AnimatePresence>
        <div className={styles.main}>
          <Header />
          {!isLogin && isHomes && <InnerNav />}
          {children}
          <Footer />
        </div>
      </LayoutContext.Provider>
    </div>
  );
};

export default Layout;
