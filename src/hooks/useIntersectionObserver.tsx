import { useRef, useEffect, useState, RefObject } from "react";

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

const useIntersectionObserver = (
  options?: IntersectionObserverOptions
): [RefObject<HTMLDivElement>, boolean] => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const callback: IntersectionObserverCallback = (entities) => {
      const target = entities[0];
      setIsIntersecting(target.isIntersecting);
    };

    const observer = new IntersectionObserver(callback, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [options]);

  return [targetRef, isIntersecting];
};

export default useIntersectionObserver;
