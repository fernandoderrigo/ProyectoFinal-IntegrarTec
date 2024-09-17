import { IoIosCloseCircleOutline } from 'react-icons/io';

export default function TransparentHeader({ hideFullReproduction }) {
  return (
    <section>
      <button onClick={hideFullReproduction}>
        <IoIosCloseCircleOutline />
      </button>
    </section>
  );
}
