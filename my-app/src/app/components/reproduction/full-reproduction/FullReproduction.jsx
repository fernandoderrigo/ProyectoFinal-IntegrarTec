import Play from '../button/Play';
import AddSong from '../button/Add';
import Pause from '../button/Pause';
import Forward from '../button/Forward';
import BackWard from '../button/Backward';
import Share from '../button/Share';
import RepeatAll from '../button/RepeatAll';
import RepeatOne from '../button/RepeatOne';
import Shuffle from '../button/Shuffle';

export default function FullReproduction() {
  return (
    <section className="flex flex-row w-full">
      <Shuffle className="full-reproduction-button" />

      <Share className="full-reproduction-button" />

      <BackWard className="full-reproduction-button" />

      <Play className="full-reproduction-button" />

      <Forward className="full-reproduction-button" />

      <RepeatAll className="full-reproduction-button" />
      <RepeatOne className="full-reproduction-button" />

      <AddSong />
    </section>
  );
}
