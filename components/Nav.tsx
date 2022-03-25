import React from "react";
import styles from "@modules/Nav.module.scss";
import Link from "next/link";

const routes = ["projects", "jobs"];
const Nav = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.logo}>logo</div>
      <div className={styles.links}>
        {routes.map((route) => {
          const isHome = route === "projects";
          return (
            <Link key={route} href={isHome ? "/" : `/${route}`}>
              <a className="link">{route}</a>
            </Link>
          );
        })}
      </div>
      <div className={styles.search}>
        <input type="text" placeholder={"search"} />
      </div>
      <div className={styles.controls}>controls</div>
    </div>
  );
};

export default Nav;
