import Play from '../button/Play';
import Add from '../button/Add';
import Pause from '../button/Pause';
import Forward from '../button/Forward';
import Backward from '../button/Backward';
import Share from '../button/Share';

export default function FullReproduction() {
  return (
    <section>
      <button>
        <Share />
      </button>
      <button>
        <Backward />
      </button>
      <button>
        <Play />
      </button>
      <button>
        <Forward />
      </button>
      <button>
        <Add />
      </button>
    </section>
  );
}
