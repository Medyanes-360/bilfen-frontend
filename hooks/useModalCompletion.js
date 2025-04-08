import { useCallback, useEffect, useRef } from "react";

export const useModalCompletion = (delay = 30000, onComplete) => {
  const timerRef = useRef(null);

  const onOpen = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      onComplete?.();
    }, delay);
  }, [delay, onComplete]);

  const onClose = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => onClose();
  }, [onClose]);

  return { onOpen, onClose };
};
