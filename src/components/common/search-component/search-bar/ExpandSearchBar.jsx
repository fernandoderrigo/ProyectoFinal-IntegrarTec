import { FaSearch } from 'react-icons/fa';

export default function ExpandSearchBar() {
  return (
    <section className='w-full grid grid-cols-5 bg-neutralViolet-50 p-2 rounded-xl justify-items-center items-baseline'>

        <span className='text-lg text-black bg-neutralViolet-50 p-1 rounded-xl col-span-4 '/>
        <FaSearch className='basic-button text-black place-self-center' />

    </section>
  );
}
