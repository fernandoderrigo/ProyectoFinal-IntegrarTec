import React, { useContext } from 'react';
import Play from './button/Play';
import AddSong from './button/Add';
import { SongContext } from '@/contexts/AudioContext';

export default function PartialReproduction({
  showFullReproduction,
  audioRef,
}) {
  const { selectedSong } = useContext(SongContext);

  const defaultSong = {
    imageUrl: '/img/gatito.webp',
    gender: 'Music',
    name: 'No song selected',
    artists: 'Select a song to play',
    duration: '--:--',
    audioUrl: '',
  };

  const infoSong = selectedSong || defaultSong;

  return (
    <section
      className="grid grid-cols-[3fr_1fr] bg-violet-800 p-2 shadow-lg"
      style={{ viewTransitionName: 'reproduction-container' }}
    >
      <button
        className="grid grid-cols-3 col-start-1 gap-4 text-left"
        onClick={showFullReproduction}
      >
        <picture
          className="w-full col-start-1 overflow-hidden aspect-square rounded-xl"
          style={{ viewTransitionName: 'song-image' }}
        >
          <img
            src={infoSong.imageUrl}
            alt={infoSong.gender}
            className="object-cover w-full h-full"
          />
        </picture>
        <section className="col-span-2 col-start-2">
          <h2
            className="font-semibold text-neutralViolet-50"
            style={{ viewTransitionName: 'song-name' }}
          >
            {infoSong.name}
          </h2>
          <p
            className="text-sm text-neutralViolet-200"
            style={{ viewTransitionName: 'song-artist' }}
          >
            {infoSong.artists}
          </p>
          <p className="text-sm text-neutralViolet-300">{infoSong.duration}</p>
        </section>
      </button>
      <section className="grid content-center grid-cols-2 px-4">
        <audio ref={audioRef} src={infoSong.audioUrl}></audio>
        <Play
          audioRef={audioRef}
          className="text-neutralViolet-50 hover:text-neutralViolet-200"
        />
        <AddSong className="text-neutralViolet-50 hover:text-neutralViolet-200" />
      </section>
    </section>
  );
}