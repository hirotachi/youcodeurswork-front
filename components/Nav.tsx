import React, { useContext } from "react";
import styles from "@modules/Nav.module.scss";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faBars from "@icons/light/faBars";
import faSearch from "@icons/regular/faSearch";
import Search from "@components/Search";
import { HeaderContext } from "@components/layout/Header";

const Nav = () => {
  const { isSearchOpen, toggleSearch } = useContext(HeaderContext);
  return (
    <div className={styles.nav}>
      <div className={styles.menu}>
        <span className={styles.icon}>
          <FontAwesomeIcon icon={faBars} />
        </span>
        <span className={styles.text}>menu</span>
      </div>
      {isSearchOpen ? (
        <Search />
      ) : (
        <div className={styles.main}>
          <span className={styles.search} onClick={() => toggleSearch()}>
            <FontAwesomeIcon icon={faSearch} />
          </span>
          <Link href={"/"}>
            <a className={styles.logo}>
              <img src="/logo.svg" alt="logo" />
            </a>
          </Link>
          <Link href={"/login"}>
            <a className={styles.auth}>register/login</a>
          </Link>
          <Link href={"/projects/create"}>
            <a className={styles.create}>submit you project</a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Nav;
