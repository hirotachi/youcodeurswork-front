import React, { useContext } from "react";
import styles from "@modules/Nav.module.scss";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faBars from "@icons/light/faBars";
import faSearch from "@icons/regular/faSearch";
import Search from "@components/Search";
import { HeaderContext } from "@components/layout/Header";
import { useRouter } from "next/router";

const Nav = () => {
  const { isSearchOpen, toggleSearch } = useContext(HeaderContext);
  const router = useRouter();
  const isAuthPage =
    router.pathname === "/login" || router.pathname === "/register";
  return (
    <div className={styles.nav}>
      {!isAuthPage && (
        <div className={styles.menu}>
          <span className={styles.icon}>
            <FontAwesomeIcon icon={faBars} />
          </span>
          <span className={styles.text}>menu</span>
        </div>
      )}
      {isSearchOpen ? (
        <Search />
      ) : (
        <div className={styles.main}>
          {!isAuthPage && (
            <span className={styles.search} onClick={() => toggleSearch()}>
              <FontAwesomeIcon icon={faSearch} />
            </span>
          )}
          <Link href={"/"}>
            <a className={styles.logo}>
              <img src="/logo.svg" alt="logo" />
            </a>
          </Link>
          {!isAuthPage && (
            <>
              <Link href={"/login"}>
                <a className={styles.auth}>log in</a>
              </Link>
              <Link href={"/register"}>
                <a className={styles.create}>Create an account</a>
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Nav;
