import { MutableRefObject, useEffect, useRef } from "react";

export const useScroll = (
  parentRef: MutableRefObject<HTMLElement | null>,
  childrenRef: MutableRefObject<HTMLElement | null>,
  callback: () => void
) => {
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!parentRef.current || !childrenRef.current) return;

    const parent = parentRef.current;
    const children = childrenRef.current;

    const options = {
      root: parent,
      rootMargin: "0px",
      threshold: 0,
    };

    observer.current = new IntersectionObserver(([target]) => {
      if (target.isIntersecting === true) {
        callback();
      }
    }, options);

    observer.current.observe(children);

    return () => {
      observer.current?.unobserve(children);
    };
  }, [parentRef, childrenRef, callback]);
};
