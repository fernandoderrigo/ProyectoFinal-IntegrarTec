import { FaSearch } from 'react-icons/fa';

export default function Search() {
  return (
    <section className='col-span-4'>
      <label htmlFor="">
        <input/>
        <FaSearch size={24} color="gray" />
      </label>
    </section>
  );
}
