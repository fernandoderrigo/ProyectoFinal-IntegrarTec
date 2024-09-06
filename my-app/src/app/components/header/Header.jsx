// import Link from 'next/link';
import { faUser, faGear } from '@fortawesome/react-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Header() {
  return (
    <header>
      <FontAwesomeIcon icon={faUser}/>
      <FontAwesomeIcon icon={faGear}/>
    </header>
  );
}
