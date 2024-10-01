'use client';

import React, { useState } from 'react';
import Gender from './Gender';
import FullGender from './FullGender';
import { Suspense } from 'react';

const SelectGender = ({ onGenreSelect }) => {
  const [isFullGenderVisible, setIsFullGenderVisible] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null); // Cambiar a una cadena en lugar de un array

  const showFullGender = (genre) => {
    setSelectedGenre(genre.gender); // Guardar solo un género
    setIsFullGenderVisible(true);
    onGenreSelect(genre.gender); // Pasar el género seleccionado al componente padre
  };

  const hideFullGender = () => {
    setIsFullGenderVisible(false);
  };

  const SkeletonGender = () => (
    <article className="grid w-full grid-cols-4 col-span-4 gap-4 px-4 py-5 animate-pulse">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="col-span-2 bg-gray-300 aspect-video rounded-xl"
        />
      ))}
    </article>
  );

  return (
    <section className="col-span-4">
      <Suspense fallback={<SkeletonGender />}>
        <Gender showFullGender={showFullGender} />
      </Suspense>
      {isFullGenderVisible && (
        <FullGender
          hideFullGender={hideFullGender}
          selectedGenre={selectedGenre} // Pasar solo el género seleccionado
        />
      )}
    </section>
  );
};

export default SelectGender;
