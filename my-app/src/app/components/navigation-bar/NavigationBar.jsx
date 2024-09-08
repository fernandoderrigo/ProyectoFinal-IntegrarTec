import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';
import { GoHomeFill } from 'react-icons/go';
import { MdKeyboardVoice } from 'react-icons/md';
import { ImBooks } from 'react-icons/im';
import { PiMusicNotesPlusFill } from 'react-icons/pi';
import Link from 'next/link'

const LINKS = [
  {
    path: '/search',
    icon: <FaSearch className="text-3xl leading-5 " />,
  },
  {
    path: '/',
    icon: <GoHomeFill className="text-3xl leading-5" />,
  },
  {
    path: '/',
    icon: <MdKeyboardVoice className="text-5xl" />,
  },
  {
    path: '/my-playlist',
    icon: <ImBooks className="text-3xl leading-5" />,
  },
  {
    path: '/my-creations',
    icon: <PiMusicNotesPlusFill className="text-3xl leading-5" />,
  },
];

export default function NavBar() {
  return (
    <nav className="w-full bg-gradient-to-t from-indigo-500">
      <ul className="flex flex-row items-end justify-around w-full">
        {LINKS.map(({ icon, path }) => {
          return (
            <li key={path} className="mb-2">
              <Link href={path}>{icon}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
