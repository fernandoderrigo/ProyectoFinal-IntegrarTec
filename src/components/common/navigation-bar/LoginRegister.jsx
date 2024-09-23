'use client'; // Marca este componente como un componente cliente

import Link from 'next/link';

export default function RegisterLogin() {

  return (
    <nav className="z-10 col-span-2 col-start-2">
      <ul className="grid w-full grid-cols-4 gap-4 px-4 pt-4 pb-1 mt-2">
        <li className="col-span-2">
          <Link href="/login">Login</Link>
        </li>
        <li className="col-span-2">
          <Link href="/register">Registrase</Link>
        </li>
      </ul>
    </nav>
  );
}
