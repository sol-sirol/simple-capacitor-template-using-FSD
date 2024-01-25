import { useCallback, useEffect, useRef } from "react";

type Handler = (event: MouseEvent) => void;

export const useOnClickOutside = <T extends HTMLElement>(
  handler: Handler,
  mouseEvent: "mousedown" | "mouseup" = "mousedown"
) => {
  const ref = useRef<T | null>(null);

  const eventListener = useCallback(
    (event: MouseEvent) => {
      const el = ref?.current;

      // Do nothing if clicking ref's element or descendent elements
      if (!el || el.contains(event.target as Node)) {
        return;
      }

      handler(event);
    },
    [ref, handler]
  );

  useEffect(() => {
    document.addEventListener(mouseEvent, eventListener);

    return () => {
      document.removeEventListener(mouseEvent, eventListener);
    };
  }, [ref, handler, mouseEvent, eventListener]);

  return ref;
};
