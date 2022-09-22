import { useEffect, useRef } from 'react';

interface RefElement {
  current: () => void;
}

export default function useInterval(callback: any, delay: number) {
  const callbackRef = useRef() as RefElement;

  // update callback function with current render callback that has access to latest props and state
  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    if (!delay) {
      return () => {};
    }

    const interval = setInterval(() => {
      callbackRef.current && callbackRef.current();
    }, delay);
    return () => clearInterval(interval);
  }, [delay]);
}
