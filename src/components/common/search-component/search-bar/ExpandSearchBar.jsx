import { FaSearch } from 'react-icons/fa';

export default function ExpandSearchBar() {
  return (
    <section className="grid items-baseline w-full grid-cols-5 p-2 bg-neutralViolet-50 rounded-xl justify-items-center">
      <span className="col-span-4 p-1 text-lg text-black bg-neutralViolet-50 rounded-xl " />
      <FaSearch className="text-black basic-button place-self-center" />
    </section>
  );
}
