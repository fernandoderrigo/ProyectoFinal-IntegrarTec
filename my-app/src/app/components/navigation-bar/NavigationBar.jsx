import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';
import { GoHomeFill } from 'react-icons/go';
import { MdKeyboardVoice } from 'react-icons/md';
import { ImBooks } from 'react-icons/im';
import { PiMusicNotesPlusFill } from 'react-icons/pi';


const LINKS = [
  {
    path: '/search',
    icon: <FaSearch />,
  },
  {
    path: '/',
    icon: <GoHomeFill />,
  },
  {
    path: '/',
    icon: <MdKeyboardVoice />,
  },
  {
    path: '/my-playlist',
    icon: <ImBooks />,
  },
  {
    path: '/my-creations',
    icon: <PiMusicNotesPlusFill/>,
  },
];

export default function NavBar() {
  return (
    <nav>
      <ul>
        {LINKS.map(({ icon, path }) => {
          return (
            <li key={path}>
              <Link href={path}>
                {icon}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
