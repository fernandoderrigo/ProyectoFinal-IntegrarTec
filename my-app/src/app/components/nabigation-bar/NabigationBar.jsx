import { FaSearch } from 'react-icons/fa';
import { GoHomeFill } from 'react-icons/go';
import { MdKeyboardVoice } from 'react-icons/md';
import { ImBooks } from 'react-icons/im';
import { PiMusicNotesPlusFill } from 'react-icons/pi';


const LINKS = [
  {
    icon: faHouse,
    path: <FaSearch />,
  },
  {
    icon: faMagnifyingGlass,
    path: <GoHomeFill />,
  },
  {
    icon: faMicrophone,
    path: <MdKeyboardVoice />,
  },
  {
    icon: faBookmark,
    path: <ImBooks />,
  },
  {
    icon: faMusic,
    path: <PiMusicNotesPlusFill/>,
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
                <FontAwesomeIcon icon={icon} />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
