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
    <section>
      <button>
        <Shuffle/>
      </button>
      <button>
        <Share />
      </button>
      <button>
        <BackWard />
      </button>
      <button>
        <Play />
      </button>
      <button>
        <Forward />
      </button>
      <button>
        <RepeatAll />
      </button>
      <button>
        <AddSong />
      </button>
    </section>
  );
}
