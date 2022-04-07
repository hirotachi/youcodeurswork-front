import { useEffect, useState } from "react";

function useToggle<T>(first: T, second: T, cb?: (b: T) => void) {
  const [state, setState] = useState(first);
  const toggle = (newState?: T) => {
    setState((v) => {
      const t = newState ?? (v === first ? second : first);
      return t;
    });
  };
  useEffect(() => {
    cb?.(state);
  }, [state, cb]);

  return [state, toggle] as const;
}

export default useToggle;
