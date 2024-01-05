import { useEffect, useState } from "react";

export const useElementIsFocused = <T extends HTMLElement>(
  ref: React.RefObject<T>
) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    const element = ref.current;

    const onFocusIn = () => setIsFocused(true);
    const onFocusOut = () => setIsFocused(false);

    element?.addEventListener("focusin", onFocusIn);
    element?.addEventListener("focusout", onFocusOut);

    return () => {
      element?.removeEventListener("focusin", onFocusIn);
      element?.removeEventListener("focusout", onFocusOut);
    };
  }, [ref]);

  return isFocused;
};
