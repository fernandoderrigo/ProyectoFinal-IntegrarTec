'use client';

import { useState } from "react";
import ExpandSearchBar from "./ExpandSearchBar";
import FullSearchBar from "./FullSearchBar";

export default function SearchBar() {
  const [isFullSearchVisible, setIsFullSearchVisible] = useState(false);

  const showFullSearch = () => {
    setIsFullSearchVisible(true);
    console.log('mostrar')
  };

  const hideFullSearch = () => {
    setIsFullSearchVisible(false);
    console.log('ocultar')

  };

  return (
    <section className="col-span-4">
      {isFullSearchVisible ? (
        <FullSearchBar hideFullSearch={hideFullSearch} />
      ) : (
        <button onClick={showFullSearch} className="w-full">
          <ExpandSearchBar />
        </button>
      )}
    </section>
  );
}
