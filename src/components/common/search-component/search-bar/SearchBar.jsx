'use client';

import { useState } from "react";
import ExpandSearchBar from "./ExpandSearchBar";
import FullSearchBar from "./FullSearchBar";

export default function SearchBar() {
  const [isFullSearchVisible, setIsFullSearchVisible] = useState(false);

  // Función para mostrar la barra de búsqueda completa
  const showFullSearch = () => {
    setIsFullSearchVisible(true);
  };

  // Función para ocultar la barra de búsqueda completa
  const hideFullSearch = () => {
    setIsFullSearchVisible(false);
  };

  return (
    <section className="col-span-4">
      {isFullSearchVisible ? (
        <FullSearchBar hideFullSearch={hideFullSearch} />
      ) : (
        <div onClick={showFullSearch}>
          <ExpandSearchBar />
        </div>
      )}
    </section>
  );
}
