import Play from '../button/Play';
import AddSong from '../button/Add';
import Pause from '../button/Pause';
import Forward from '../button/Forward';
import BackWard from '../button/Backward';
import Share from '../button/Share';
import RepeatAll from '../button/RepeatAll';
import RepeatOne from '../button/RepeatOne';
import Shuffle from '../button/Shuffle';
import TransparentHeader from '../../header/TransparentHeader';

export default function FullReproduction() {
  return (
    <>
      <section>
        <article>
          <TransparentHeader />
        </article>
        <article className="flex flex-row w-full">
          <audio src=""></audio>
          <Shuffle className="full-reproduction-button" />

          <Share className="full-reproduction-button" />

          <BackWard className="full-reproduction-button" />

          <Play className="full-reproduction-button" />

          <Forward className="full-reproduction-button" />

          <RepeatAll className="full-reproduction-button" />
          <RepeatOne className="full-reproduction-button" />

          <AddSong />
        </article>
      </section>
    </>
  );
}
