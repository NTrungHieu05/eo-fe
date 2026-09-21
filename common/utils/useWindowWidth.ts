import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

export function useWindowWidth(delay = 700) {
  const isBrowser = typeof window !== 'undefined';
  const [width, setWidth] = useState(isBrowser ? window.innerWidth : 0);

  useEffect(() => {
    if (isBrowser) {
      const handleResize = () => setWidth(window.innerWidth);
      const debouncedHandleResize = debounce(handleResize, delay);
      window.addEventListener('resize', debouncedHandleResize);
      return () => {
        window.removeEventListener('resize', debouncedHandleResize);
      };
    }
    return () => null;
  }, [delay, isBrowser]);

  const triggerWidthChange = () => {
    window.dispatchEvent(new Event('resize'));
  };

  return {
    width,
    triggerWidthChange,
  };
}

export default useWindowWidth;
