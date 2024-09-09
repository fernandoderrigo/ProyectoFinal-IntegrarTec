import Play from '../button/Play';
import AddSong from '../button/Add';
import Pause from '../button/Pause';
import Expand from '../button/Expand';

export default function PartialReproduction() {
  return (
    <section className="flex flex-row w-full">
      <Expand className="basic-reproduction-button" />

      <Play className="basic-reproduction-button" />

      <AddSong className="basic-reproduction-button" />
    </section>
  );
}
