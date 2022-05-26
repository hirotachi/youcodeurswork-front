import React, {
  KeyboardEventHandler,
  useContext,
  useEffect,
  useRef,
} from "react";
import useInput from "@hooks/useInput";
import styles from "@modules/Search.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faTimes from "@icons/regular/faTimes";
import { HeaderContext } from "@components/layout/Header";
import { useRouter } from "next/router";

const Search = () => {
  const router = useRouter();
  const { props: inputProps } = useInput((router.query?.q as string) ?? "");
  const inputRef = useRef<HTMLInputElement>(null);
  const { isFiltersOpen, toggleSearch, toggleFilters } =
    useContext(HeaderContext);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  const isProjects =
    router.pathname.includes("/projects") || router.pathname === "/";

  const onSubmit: KeyboardEventHandler = (e) => {
    if (e.code !== "Enter") {
      return;
    }
    const isResultPage = ["/", "/projects"].includes(router.pathname);
    const query = {
      ...(isResultPage ? router.query : {}),
      q: inputProps.value,
    };
    Object.keys(query).forEach((key) => {
      if (query[key] === "") {
        delete query[key];
      }
    });
    const config = {
      pathname: isProjects ? "/" : `/jobs`,
      query,
    };
    if (isResultPage) {
      router.replace(config, undefined, { shallow: true });
      return;
    }

    router.push(config);
  };

  return (
    <div className={styles.search}>
      <div className={styles.main}>
        <input
          ref={inputRef}
          className={styles.input}
          type="text"
          {...inputProps}
          onKeyUp={onSubmit}
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
