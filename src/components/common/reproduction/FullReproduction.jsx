import React, { useContext } from 'react';
import Play from './button/Play';
import AddSong from './button/Add';
import Forward from './button/Forward';
import BackWard from './button/Backward';
import Share from './button/Share';
import RepeatAll from './button/RepeatAll';
import Shuffle from './button/Shuffle';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { SongContext } from '@/contexts/AudioContext';

export default function FullReproduction({ hideFullReproduction, audioRef }) {
  const { selectedSong } = useContext(SongContext);

  const defaultSong = {
    imageUrl: '/placeholder.svg?height=300&width=300',
    gender: 'Music',
    name: 'No song selected',
    artists: 'Select a song to play',
    duration: '--:--',
    audioUrl: '',
  };

  const infoSong = selectedSong || defaultSong;

  return (
    <section
      className="fixed inset-0 z-50 flex flex-col bg-violet-900"
      style={{ viewTransitionName: 'reproduction-container' }}
    >
      <header className="flex items-center justify-between p-4 bg-violet-800">
        <button
          onClick={hideFullReproduction}
          className="text-neutralViolet-50 hover:text-neutralViolet-200"
        >
          <IoIosCloseCircleOutline className="text-4xl" />
        </button>
        <picture
          className="w-16 h-16 overflow-hidden rounded-xl"
          style={{ viewTransitionName: 'song-image' }}
        >
          <img
            src={infoSong.imageUrl}
            alt={infoSong.gender}
            className="object-cover w-full h-full"
          />
        </picture>
      </header>

      <main className="flex flex-col items-center justify-center flex-grow p-4">
        <picture className="w-64 h-64 mb-8 overflow-hidden shadow-lg rounded-xl">
          <img
            src={infoSong.imageUrl}
            alt={infoSong.gender}
            className="object-cover w-full h-full"
          />
        </picture>
        <h2
          className="mb-2 text-2xl font-bold text-neutralViolet-50"
          style={{ viewTransitionName: 'song-name' }}
        >
          {infoSong.name}
        </h2>
        <p
          className="mb-8 text-lg text-neutralViolet-200"
          style={{ viewTransitionName: 'song-artist' }}
        >
          {infoSong.artists}
        </p>
      </main>

      <footer className="p-4 bg-violet-800">
        <audio ref={audioRef} src={infoSong.audioUrl}></audio>
        <section className="flex items-center mb-4 justify-evenly">
          <Shuffle className="text-neutralViolet-50 hover:text-neutralViolet-200" />
          <BackWard
            audioRef={audioRef}
            className="text-neutralViolet-50 hover:text-neutralViolet-200"
          />
          <Play
            audioRef={audioRef}
            classIcon="text-4xl text-neutralViolet-50 hover:text-neutralViolet-200"
          />
          <Forward
            audioRef={audioRef}
            className="text-neutralViolet-50 hover:text-neutralViolet-200"
          />
          <RepeatAll className="text-neutralViolet-50 hover:text-neutralViolet-200" />
        </section>
        <section className="flex justify-center space-x-4">
          <Share className="text-neutralViolet-50 hover:text-neutralViolet-200" />
          <AddSong className="text-neutralViolet-50 hover:text-neutralViolet-200" />
        </section>
      </footer>
    </section>
  );
}