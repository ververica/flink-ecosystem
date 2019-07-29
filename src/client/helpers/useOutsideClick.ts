import { useEffect, useRef } from "react";

export default function useOutsideClick(callback: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (ref.current && ref.current.contains(target)) return;
    callback();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  });

  return ref;
}
