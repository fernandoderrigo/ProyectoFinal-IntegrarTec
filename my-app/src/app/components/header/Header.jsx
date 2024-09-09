import { FaUser } from 'react-icons/fa';
import { IoSettings } from 'react-icons/io5';

export default function Header() {
  return (
    <header className="flex flex-row items-center justify-between w-full p-3 bg-gradient-to-b from-indigo-500">
      <FaUser className="basic-button" />
      <IoSettings className="basic-button" />
    </header>
  );
}
