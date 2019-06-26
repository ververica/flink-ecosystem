import { useEffect } from "react";

type UseScroll = (watcher: any) => void;

const useScroll: UseScroll = watcher => {
  useEffect(() => {
    try {
      // trying to use new API - https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
      window.scroll({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    } catch (error) {
      // just a fallback for older browsers
      window.scrollTo(0, 0);
    }
  }, [watcher]);
};

export default useScroll;
