import { useEffect, useRef } from "react";

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export default function useTimeout(callback, delay) {
  const callbackRef = useRef();

  // Remember the latest callback.
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const tick = () => callbackRef.current();

    if (delay !== null) {
      let id = setTimeout(tick, delay);
      return () => clearTimeout(id);
    }
  }, [delay]);
}
