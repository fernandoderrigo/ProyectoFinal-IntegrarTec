import React, { useRef, useContext } from 'react';
import Play from '../button/Play';
import AddSong from '../button/Add';
import { SongContext } from '@/contexts/AudioContext';

export default function PartialReproduction({ showFullReproduction }) {
  const audioRef = useRef(null);
  const { selectedSong } = useContext(SongContext);

  // Add a null check
  if (!selectedSong) {
    return <div>No song selected</div>; // Or any other placeholder content
  }

  return (
    <section className="col-span-4 grid grid-cols-[3fr_1fr] bg-violet-900 p-1">
      <button
        className="grid grid-cols-3 col-start-1 gap-4"
        onClick={showFullReproduction}
      >
        <picture className="w-full col-start-1 overflow-hidden aspect-square rounded-xl">
          <img src={selectedSong.imageUrl} alt={selectedSong.gender} />
        </picture>
        <section className="col-span-2 col-start-2 text-start">
          <h2>{selectedSong.name}</h2>
          <p className="text-sm">{selectedSong.artists}</p>
          <p className="text-sm">{selectedSong.duration}</p>
        </section>
      </button>
      <section className="grid content-center grid-cols-2 px-4">
        <audio ref={audioRef} src={selectedSong.audioUrl}></audio>
        <Play audioRef={audioRef} className="basic-reproduction-button" />
        <AddSong className="basic-reproduction-button" />
      </section>
    </section>
  );
}
