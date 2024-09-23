'use client';

import { useState, useEffect } from 'react';
import ExpandSearchBar from './ExpandSearchBar';
import FullSearchBar from './FullSearchBar';

export default function SearchBar() {
  const [isFullSearchVisible, setIsFullSearchVisible] = useState(false);

  useEffect(() => {
    if (isFullSearchVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isFullSearchVisible]);

  const showFullSearch = () => {
    setIsFullSearchVisible(true);
  };

  const hideFullSearch = () => {
    setIsFullSearchVisible(false);
  };

  return (
    <section className="col-span-4">
      <button onClick={showFullSearch} className="w-full">
        <ExpandSearchBar />
      </button>
      {isFullSearchVisible && <FullSearchBar hideFullSearch={hideFullSearch} />}
    </section>
  );
}
