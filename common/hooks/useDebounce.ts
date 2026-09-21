import { useRef, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';

export function useDebounce(cb, delay) {
  const options = {
    leading: false,
    trailing: true,
  };
  const inputsRef = useRef(cb); // mutable ref like with useThrottle
  useEffect(() => {
    inputsRef.current = { cb, delay };
  }); //also track cur. delay
  return useCallback(
    debounce(
      (...args) => {
        // Debounce is an async callback. Cancel it, if in the meanwhile
        // (1) component has been unmounted (see isMounted in snippet)
        // (2) delay has changed
        if (inputsRef.current.delay === delay) inputsRef.current.cb(...args);
      },
      delay,
      options
    ),
    [delay, debounce]
  );
}
