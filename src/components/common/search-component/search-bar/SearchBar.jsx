import { FaSearch } from 'react-icons/fa';

export default function Search() {
  return (
    <section className='col-span-4'>
      <label htmlFor="" className='w-full grid grid-cols-5 bg-neutralViolet-900 p-2 rounded-xl justify-items-center items-baseline'>
        <input className='text-lg text-black bg-neutralGreen-800 bg-opacity-10 p-1 rounded-xl col-span-4 '/>
        <FaSearch size={24} color="gray" />
      </label>
    </section>
  );
}
