import { FaUser } from 'react-icons/fa';
import { IoSettings } from 'react-icons/io5';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex flex-row items-center justify-between basic-header bg-gradient-to-b from-indigo-500">
      <Link href="/profile">
        <FaUser className="basic-button" />
      </Link>
      <Link href="/profile/setting">
        <IoSettings className="basic-button" />
      </Link>
    </header>
  );
}
