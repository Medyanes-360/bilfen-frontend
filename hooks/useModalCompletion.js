import { useCallback, useEffect, useRef, useState } from "react";

export const useModalCompletion = (delay = 30000, onComplete) => {
  const [completed, setCompleted] = useState(false);
  const timerRef = useRef(null);

  const onOpen = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setCompleted(true);
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

  return { onOpen, onClose, completed };
};
