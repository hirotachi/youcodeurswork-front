import { useEffect, useRef } from "react";

type ClickOutsideOptions = {
  event: keyof DocumentEventMap;
};
const defaultClickOutsideOptions: ClickOutsideOptions = {
  event: "click",
};

function useClickOutside(
  callback: (
    e: MouseEvent,
    target: EventTarget | null,
    isChild: boolean
  ) => void,
  dependencies?: any[],
  options: ClickOutsideOptions = defaultClickOutsideOptions
) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handler: EventListener = (e: MouseEvent) => {
      if (!ref?.current) return;
      const isChild = ref?.current.contains(e?.target as Node);
      if (!isChild) callback(e, e.target, isChild);
    };
    document.addEventListener(options.event, handler);
    return () => document.addEventListener(options.event, handler);
  }, dependencies);
  return ref;
}

export default useClickOutside;
