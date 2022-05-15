import React, { useContext, useEffect, useRef } from "react";
import useInput from "@hooks/useInput";
import styles from "@modules/Search.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faTimes from "@icons/regular/faTimes";
import { HeaderContext } from "@components/layout/Header";
import { useRouter } from "next/router";

const Search = () => {
  const { props: inputProps } = useInput("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { isFiltersOpen, toggleSearch, toggleFilters } =
    useContext(HeaderContext);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  const router = useRouter();
  const isProjects =
    router.pathname.includes("/projects") || router.pathname === "/";
  return (
    <div className={styles.search}>
      <div className={styles.main}>
        <input
          ref={inputRef}
          className={styles.input}
          type="text"
          {...inputProps}
          placeholder={`Search for ${
            isProjects ? "projects" : "jobs"
          } (HTML5, PHP, React...)`}
        />
        <span className={styles.filter} onClick={() => toggleFilters()}>
          {isFiltersOpen ? "hide" : "show"} filters
        </span>
      </div>

      <span className={styles.close} onClick={() => toggleSearch(false)}>
        <FontAwesomeIcon icon={faTimes} />
      </span>
    </div>
  );
};

export default Search;
