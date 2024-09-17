'use client';

import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { useState } from "react";

export default function Play({classIcon}) {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Función para alternar entre play y pause
  const togglePlayPause = () => {
    setIsPlaying((prevState) => !prevState);
  };

  return (
    <button onClick={togglePlayPause}>
      {isPlaying ? (
        <FaPause className={classIcon}/>
      ) : (
        <FaPlay className={classIcon}/>
      )}
    </button>
  );
}
