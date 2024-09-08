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
    <section className="flex-row">
      <Shuffle />

      <Share />

      <BackWard />

      <Play />

      <Forward />

      <RepeatAll />
      <RepeatOne />

      <AddSong />
    </section>
  );
}
