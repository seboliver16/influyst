// useIsMobile.ts
import { useState, useEffect } from 'react';

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', updateSize);
    updateSize(); // initial check
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return isMobile;
};
