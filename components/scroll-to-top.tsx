'use client';

import { useEffect } from 'react';

export function ScrollToTop() {
  useEffect(() => {
    // Disable browser's scroll restoration so it never goes back to where you were
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    // Immediately jump to the top
    window.scrollTo(0, 0);
  }, []);

  return null;
}
