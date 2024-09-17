import React, { useRef } from 'react';
import Play from '../button/Play';
import AddSong from '../button/Add';

export default function PartialReproduction({showFullReproduction}) {
  const audioRef = useRef(null);
  return (
    <section className='col-span-4 grid grid-cols-[3fr_1fr]'>
      <button className='w-full pl-7 py-2' onClick={showFullReproduction}>
          <img src="https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb" alt=""  className="w-1/5 aspect-square overflow-hidden rounded-xl "/>
      </button>
      <section className="grid grid-cols-2 content-center px-4">
        <audio ref={audioRef} src="/AcousticGuitar1.mp3"></audio>
        <Play audioRef={audioRef} className="basic-reproduction-button" />
        <AddSong className="basic-reproduction-button" />
      </section>
    </section>
  );
}
