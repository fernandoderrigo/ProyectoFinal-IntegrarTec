'use client';

import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useRouter } from 'next/navigation';
export default function HeaderProfile() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/home');
  };

  return (
    <header className="flex items-center justify-between w-full p-4 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900">
      <picture className="overflow-hidden border-4 border-white rounded-full w-14 h-14">
        <img
          className="object-cover w-full h-full"
          src="https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb"
          alt="Profile"
        />
      </picture>
      <button
        className="p-2 text-3xl text-white transition-all duration-200 ease-in-out hover:text-gray-300"
        onClick={handleBack}
        aria-label="Regresar"
      >
        <IoIosCloseCircleOutline />
      </button>
    </header>
  );
}
