import Play from '../button/Play';
import AddSong from '../button/Add';
import Forward from '../button/Forward';
import BackWard from '../button/Backward';
import Share from '../button/Share';
import RepeatAll from '../button/RepeatAll';
import Shuffle from '../button/Shuffle';
import { IoIosCloseCircleOutline } from 'react-icons/io';

export default function FullReproduction({ hideFullReproduction }) {
  return (
    <section className="fixed top-0 right-0 w-screen h-screen bg-black grid grid-cols-4 grid-rows-2">
      {/* Botón para cerrar la reproducción completa */}
      <section className="col-span-4 row-start-1">
        <button onClick={hideFullReproduction}>
          <IoIosCloseCircleOutline className="text-white text-4xl" />
        </button>
      </section>
      {/* Controles de reproducción */}
      <article className="col-span-4 grid grid-rows-2 row-start-2 self-end mb-10">
        <audio src="" className="w-full" />
        <section className="flex justify-evenly items-center">
          <Shuffle className="full-reproduction-button" />
          <Share className="full-reproduction-button" />
          <BackWard className="full-reproduction-button" />
          {/* Componente Play con el estado hideFullReproduction */}
          <Play className="h-1/5 aspect-square" classIcon={'text-3xl'}/>
          <Forward className="full-reproduction-button" />
          <RepeatAll className="full-reproduction-button" />
          <AddSong className="full-reproduction-button" />
        </section>
      </article>
    </section>
  );
}
