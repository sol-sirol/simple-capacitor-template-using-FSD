import { useCallback, useRef } from "react";

export const useDebounce = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay = 300
) => {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: T) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => callback(...args), delay);
    },
    [callback, delay]
  );

  return debouncedCallback;
};
