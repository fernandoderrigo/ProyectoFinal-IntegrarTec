'use client';

import Gender from '@/components/common/music/gender/Gender';
import SearchBar from '@/components/common/search-component/search-bar/SearchBar';
import { useRestartScroll } from '@/hooks/useRestartScroll';

export default function search() {
  useRestartScroll();
  return (
    <>
      <SearchBar />
      <Gender />
    </>
  );
}
