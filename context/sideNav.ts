import { createContext } from "react";

export type SideNavContextProps = {
  isOpen: boolean;
  toggle: (newState?: boolean) => void;
};

const SideNavContext = createContext<SideNavContextProps>(
  {} as SideNavContextProps
);

export default SideNavContext;
