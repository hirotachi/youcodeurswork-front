import React, { useContext } from "react";
import styles from "@modules/layout/Nav.module.scss";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faBars from "@icons/light/faBars";
import faSearch from "@icons/regular/faSearch";
import Search from "@components/Search";
import { HeaderContext } from "@components/layout/Header";
import { useRouter } from "next/router";
import { LayoutContext } from "@components/layout/Layout";
import useAuth from "@hooks/useAuth";
import UserMenu from "@components/UserMenu";
import withNoSSR from "@lib/withNoSSR";

const Nav = () => {
  const { isSearchOpen, toggleSearch } = useContext(HeaderContext);
  const { setIsSideNavOpen } = useContext(LayoutContext);
  const { isLoggedIn, role } = useAuth();

  const router = useRouter();
  const isAuthPage = ["/login", "/register"].some(
    (page) => router.pathname === page
  );

  const isCreationPage = ["/update", "/submit"].some((page) =>
    router.pathname.includes(page)
  );
  return (
    <div className={styles.nav}>
      {!isAuthPage && (
        <div className={styles.menu} onClick={() => setIsSideNavOpen(true)}>
          <span className={styles.icon}>
            <FontAwesomeIcon icon={faBars} />
          </span>
          <span className={styles.text}>menu</span>
        </div>
      )}
      {isSearchOpen && !isAuthPage ? (
        <Search />
      ) : (
        <div className={styles.main}>
          {!isAuthPage && !isCreationPage && (
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
              <div className={styles.auth}>
                {isLoggedIn ? (
                  <UserMenu />
                ) : (
                  <Link href={"/login"}>
                    <a className={styles.login}>log in</a>
                  </Link>
                )}
              </div>

              <Link
                href={
                  isLoggedIn
                    ? `/${role === "student" ? "projects" : "jobs"}/submit`
                    : "/register"
                }
              >
                <a className={styles.create}>
                  {isLoggedIn
                    ? role === "student"
                      ? "submit your project"
                      : "post a job"
                    : "create account"}
                </a>
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default withNoSSR(Nav);
