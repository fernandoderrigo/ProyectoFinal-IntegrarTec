import Play from '../button/Play';
import AddSong from '../button/Add';
import Pause from '../button/Pause';
import Forward from '../button/Forward';
import BackWard from '../button/Backward';
import Share from '../button/Share';
import RepeatAll from '../button/RepeatAll';
import RepeatOne from '../button/RepeatOne';
import Shuffle from '../button/Shuffle';
import TransparentHeader from '../../../profile/header/TransparentHeader';

export default function FullReproduction() {
  return (
      <section className='col-span-4 grid grid-rows-2 content-center'>
        <article>
          <TransparentHeader />
        </article>
        <article className="grid grid-rows-2">
          <audio src=""/>
          <section className='flex justify-evenly'>
            <Shuffle className="full-reproduction-button" />

            <Share className="full-reproduction-button" />

            <BackWard className="full-reproduction-button" />

            <Play className="full-reproduction-button" />

            <Forward className="full-reproduction-button" />

            <RepeatAll className="full-reproduction-button" />

            <AddSong className="full-reproduction-button"/>
          </section>
        </article>
      </section>
  );
}
