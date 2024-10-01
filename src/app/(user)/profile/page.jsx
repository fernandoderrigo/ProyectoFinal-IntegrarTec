'use client';

import { FaUserEdit } from 'react-icons/fa';
import DeleteUserButton from '@/components/profile/deleteProfile/DeleteProfile';
import Logout from '@/components/profile/logout/Logout';
import Link from 'next/link';

export default function Profile() {
  return (
    <section className="grid grid-cols-4 col-span-4 gap-4 p-5 px-4 bg-violetBlue-900/30 rounded-3xl ">
      <nav className="grid col-span-4 p-2.5 gap-4">
        <Link
          href="/profile/edit"
          className="flex items-center justify-between col-span-4 px-4 py-2 text-base text-white bg-gray-800 rounded-lg hover:bg-gray-700"
        >
          <span>Editar Perfil</span>
          <span className="text-gray-400">
            <FaUserEdit />
          </span>
        </Link>
        <DeleteUserButton />
        <Logout className="col-span-4" />
      </nav>
    </section>
  );
}
