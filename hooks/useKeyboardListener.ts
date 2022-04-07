import { KeyboardEventHandler, useEffect, useRef } from "react";

function useKeyboardListener<T extends Window | HTMLDivElement>(
  cb: KeyboardEventHandler<T>,
  options?: {
    target?: T;
    event?: "keyup" | "keydown" | "keypress";
  }
) {
  const ref = useRef<T>(null);
  const { event, target } = options ?? {};
  useEffect(() => {
    const el = target ?? ref?.current;
    if (!el) return () => {};
    const eventName = event ?? "keyup";
    el?.addEventListener(eventName, cb);
    return () => {
      el?.removeEventListener(eventName, cb);
    };
  });
  return ref;
}

export default useKeyboardListener;
