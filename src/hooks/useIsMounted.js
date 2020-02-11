import { useRef, useEffect } from 'react';

function useIsMounted() {
  const isMounted = useRef(true);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted;
}

export default useIsMounted;
