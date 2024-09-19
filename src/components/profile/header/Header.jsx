import { FaUser } from 'react-icons/fa';
import { IoSettings } from 'react-icons/io5';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="p-3 flex flex-row items-center justify-between basic-header bg-black">
      <Link href="/profile">
        <FaUser className="basic-button" />
      </Link>
      <Link href="/profile/user-setting">
        <IoSettings className="basic-button" />
      </Link>
    </header>
  );
}
