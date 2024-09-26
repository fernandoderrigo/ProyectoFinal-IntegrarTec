import { useEffect } from 'react';

export const useRestartScroll = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
};
