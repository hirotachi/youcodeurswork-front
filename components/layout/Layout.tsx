import React, { PropsWithChildren } from "react";
import Header from "./Header";
import Footer from "./Footer";

//todo: add footer
const Layout: PropsWithChildren<any> = (props) => {
  const { children } = props;
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
