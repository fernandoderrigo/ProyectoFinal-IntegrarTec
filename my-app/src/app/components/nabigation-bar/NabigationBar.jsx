import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faMagnifyingGlass,
  faMicrophone,
  faBookmark,
  faMusic,
} from '@fortawesome/free-solid-svg-icons';

const LINKS = [
  {
    icon: faHouse,
    path: '/search',
  },
  {
    icon: faMagnifyingGlass,
    path: '/home',
  },
  {
    icon: faMicrophone,
    path: '/voice',
  },
  {
    icon: faBookmark,
    path: '/my-playlist',
  },
  {
    icon: faMusic,
    path: '/my-songs',
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
