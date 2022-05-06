import React, { createContext, PropsWithChildren, useState } from "react";
import styles from "@modules/Layout.module.scss";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";
import InnerNav from "@components/InnerNav";

// create context for side nav to be opened

type SideNavContextProps = {
  isSideNavOpen: boolean;
  setIsSideNavOpen: (isSideNavOpen: boolean) => void;
};
export const SideNavContext = createContext<SideNavContextProps | null>(null);

const Layout: PropsWithChildren<any> = (props) => {
  const { children } = props;
  const router = useRouter();
  const isLogin = router.pathname === "/login";
  const isHomes = router.pathname === "/jobs" || router.pathname === "/";
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  return (
    <div className={styles.layout}>
      <SideNavContext.Provider value={{}}>
        {/*<div className={styles.side}>/!*<SideNav />*!/</div>*/}
        {/*<div className={styles.main}>*/}
        <Header />
        {!isLogin && isHomes && <InnerNav />}
        {children}
        <Footer />
        {/*</div>*/}
      </SideNavContext.Provider>
    </div>
  );
};

export default Layout;
