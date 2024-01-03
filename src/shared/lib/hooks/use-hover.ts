import {
  MutableRefObject,
  useEffect,
  useState,
} from "react";

export const useHover = <T extends MutableRefObject<HTMLElement | null>>(ref: T) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const on = () => {
    setIsHovering(true);
  };
  const off = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    if (!ref?.current) return;

    const node = ref.current;

    node.addEventListener("mouseenter", on);
    node.addEventListener("mousemove", on);
    node.addEventListener("mouseleave", off);

    return () => {
      node.removeEventListener("mouseenter", on);
      node.removeEventListener("mousemove", on);
      node.removeEventListener("mouseleave", off);
    };
  }, [ref]);

  return isHovering;
};
