import { useEffect, useRef } from "react";

/**
 * run callback multiple times by timeout time in milliseconds
 * returns interval clear function
 * @param cb
 * @param timeout
 */
export default function useInterval(cb: () => void, timeout: number) {
  const ref = useRef<NodeJS.Timeout | undefined>(undefined);
  /**
   * clear interval
   */
  const clear = () => {
    const intervalId = ref?.current;
    if (!intervalId) return;
    clearInterval(intervalId);
  };
  useEffect(() => {
    ref.current = setInterval(cb, timeout);
    return () => {
      clear();
    };
  }, []);
  return clear;
}
