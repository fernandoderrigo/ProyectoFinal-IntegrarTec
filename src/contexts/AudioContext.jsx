'use client'

import { createContext, useState } from 'react';

export const SongContext = createContext();

export function SongProvider({ children }) {
  const [selectedSong, setSelectedSong] = useState(null);

  return (
    <SongContext.Provider value={{ selectedSong, setSelectedSong }}>
      {children}
    </SongContext.Provider>
  );
}
