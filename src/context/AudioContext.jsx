'use client'
import { createContext, useRef, useContext } from 'react';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(new Audio('/AcousticGuitar1.mp3'));

  return (
    <AudioContext.Provider value={{ audioRef }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
