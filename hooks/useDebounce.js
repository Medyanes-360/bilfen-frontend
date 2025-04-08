"use client";
import { useCallback, useEffect, useRef } from "react";

const useDebounce = (delay, callback) => {
  const timer = useRef(null);

  const debouncedCallback = useCallback(  
    (...args) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        callback(...args);  
      }, delay);
    },
    [delay, callback]
  );

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return debouncedCallback;
};

export default useDebounce;
