import React, { useRef } from 'react';
import Play from '../button/Play';
import AddSong from '../button/Add';
import Forward from '../button/Forward';
import BackWard from '../button/Backward';
import Share from '../button/Share';
import RepeatAll from '../button/RepeatAll';
import Shuffle from '../button/Shuffle';
import { IoIosCloseCircleOutline } from 'react-icons/io';

export default function FullReproduction({ hideFullReproduction }) {
  const audioRef = useRef(null); 

  return (
    <section className="fixed z-50 top-0 right-0 w-screen h-screen bg-black grid grid-cols-4 grid-rows-2">
      <section className="col-span-4 row-start-1">
        <button onClick={hideFullReproduction}>
          <IoIosCloseCircleOutline className="text-white text-4xl" />
        </button>
      </section>

      <article className="col-span-4 grid grid-rows-2 row-start-2 self-end mb-10">
        <audio ref={audioRef} src="/AcousticGuitar1.mp3" className="w-full" />
        <section className="flex justify-evenly items-center">
          <Shuffle className="full-reproduction-button" />
          <Share className="full-reproduction-button" />
          <BackWard audioRef={audioRef} className="full-reproduction-button" />
          <Play audioRef={audioRef} classIcon="text-3xl" />
          <Forward audioRef={audioRef} className="full-reproduction-button" />
          <RepeatAll className="full-reproduction-button" />
          <AddSong className="full-reproduction-button" />
        </section>
      </article>
    </section>
  );
}
