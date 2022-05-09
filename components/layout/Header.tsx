import React, { createContext, useEffect, useState } from "react";
import Nav from "@components/Nav";
import Filters from "@components/Filters";
import { AnimatePresence } from "framer-motion";
import styles from "@modules/layout/Header.module.scss";
import useIsAuthPage from "@hooks/useIsAuthPage";

type HeaderContextProps = {
  isSearchOpen: boolean;
  isFiltersOpen: boolean;
  toggleFilters: (newState?: boolean) => void;
  toggleSearch: (newState?: boolean) => void;
};
// @ts-ignore
export const HeaderContext = createContext<HeaderContextProps>(null);

const Header = () => {
  const isAuthPage = useIsAuthPage();
  const initialState = { isSearchOpen: false, isFiltersOpen: false };
  const [state, setState] = useState(initialState);
  const toggleFilters = (newState?: boolean) => {
    setState((v) => ({ ...v, isFiltersOpen: newState ?? !v.isFiltersOpen }));
  };
  const toggleSearch = (newState?: boolean) => {
    setState((v) => ({
      ...v,
      isSearchOpen: newState ?? !v.isSearchOpen,
      isFiltersOpen: !newState ?? !v.isSearchOpen ? false : v.isFiltersOpen,
    }));
  };

  useEffect(() => {
    if (isAuthPage) {
      toggleSearch(false);
    }
  }, [isAuthPage]);

  return (
    <HeaderContext.Provider value={{ ...state, toggleFilters, toggleSearch }}>
      <div className={styles.header}>
        <Nav />
        <AnimatePresence>{state.isFiltersOpen && <Filters />}</AnimatePresence>
      </div>
    </HeaderContext.Provider>
  );
};

export default Header;
