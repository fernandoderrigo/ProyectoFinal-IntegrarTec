import Play from '../button/Play';
import Add from '../button/Add';
import Pause from '../button/Pause';
import Expand from '../button/Expand';

export default function PartialReproduction() {
  return (
    <section>
      <button>
        <Expand />
      </button>
      <button>
        <Play />
      </button>
      <button>
        <Add />
      </button>
    </section>
  );
}
