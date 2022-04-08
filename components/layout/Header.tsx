import React, { createContext, useState } from "react";
import Nav from "@components/Nav";

type HeaderContextProps = {
  isSearchOpen: boolean;
  isFiltersOpen: boolean;
  toggleFilters: (newState?: boolean) => void;
  toggleSearch: (newState?: boolean) => void;
};
export const HeaderContext = createContext<HeaderContextProps>(null);
const Header = () => {
  const initialState = { isSearchOpen: false, isFiltersOpen: false };
  const [state, setState] = useState(initialState);
  const toggleFilters = (newState?: boolean) => {
    setState((v) => ({ ...v, isFiltersOpen: newState ?? !v.isFiltersOpen }));
  };
  const toggleSearch = (newState?: boolean) => {
    setState((v) =>
      v.isSearchOpen ? initialState : { ...v, isSearchOpen: true }
    );
  };
  return (
    <HeaderContext.Provider value={{ ...state, toggleFilters, toggleSearch }}>
      <div>
        <Nav />
        {state.isFiltersOpen && <div>filters</div>}
      </div>
    </HeaderContext.Provider>
  );
};

export default Header;
