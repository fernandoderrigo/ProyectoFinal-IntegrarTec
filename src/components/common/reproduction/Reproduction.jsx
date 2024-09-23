'use client';

import { useState, useRef, useEffect } from 'react';
import PartialReproduction from './PartialReproduction';
import FullReproduction from './FullReproduction';

export default function Reproduction() {
  const [isFullReproductionVisible, setIsFullReproductionVisible] =
    useState(false);
  const audioRef = useRef(null);

  const toggleReproduction = () => {
    if ('startViewTransition' in document) {
      document.startViewTransition(() => {
        setIsFullReproductionVisible((prev) => !prev);
      });
    } else {
      setIsFullReproductionVisible((prev) => !prev);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isFullReproductionVisible) {
        toggleReproduction();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFullReproductionVisible]);

  return (
    <section className="z-50 ">
      {isFullReproductionVisible ? (
        <FullReproduction
          hideFullReproduction={toggleReproduction}
          audioRef={audioRef}
        />
      ) : (
        <PartialReproduction
          showFullReproduction={toggleReproduction}
          audioRef={audioRef}
        />
      )}
    </section>
  );
}