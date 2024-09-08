import { FaUser } from 'react-icons/fa';
import { IoSettings } from 'react-icons/io5';

export default function Header() {
  return (
    <header className='flex flex-row items-center justify-between w-full bg-gradient-to-t from-indigo-500'>
      <FaUser />
      <IoSettings />
    </header>
  );
}
