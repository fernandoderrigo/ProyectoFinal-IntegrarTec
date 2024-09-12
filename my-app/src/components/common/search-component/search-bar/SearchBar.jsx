import { FaSearch } from 'react-icons/fa';

export default function Search() {
  return (
    <section className='col-span-4'>
      <label htmlFor="" className='w-full flex justify-around bg-neutralViolet-900 p-2 rounded-full'>
        <input className='text-lg text-black bg-neutralGreen-800 bg-opacity-10 p-1 rounded-full'/>
        <FaSearch size={24} color="gray" />
      </label>
    </section>
  );
}
