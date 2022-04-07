import { useEffect, useRef } from "react";

export default function usePrevious<T>(state) {
  const ref = useRef();
  useEffect(() => {
    ref.current = state;
  }, [state]);
  return ref.current;
}
