// src/hooks/useClickOutside.tsx
import { useEffect, RefObject } from "react";

type Handler = (event: MouseEvent) => void;

function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  handler: Handler,
  ...dependencies: any[]
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler, ...dependencies]);
}

export default useClickOutside;
