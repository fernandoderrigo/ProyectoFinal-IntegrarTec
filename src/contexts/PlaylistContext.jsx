'use client'

import React, { createContext, useState, useContext } from 'react';

const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
  const [selectedSongs, setSelectedSongs] = useState([]);

  return (
    <PlaylistContext.Provider value={{ selectedSongs, setSelectedSongs }}>
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = () => useContext(PlaylistContext);
