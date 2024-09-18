'use client';

import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function HeaderProfile() {
  const router = useRouter();
  const pathname = usePathname();
  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    if (window.history.length > 1) {
      setHasNavigated(true);
      console.log('Hay historial dentro de la app');
    } else {
      console.log('No hay historial dentro de la app');
    }
  }, []);

  const handleBack = () => {
    if (hasNavigated) {
      router.back();
      console.log('Navegando hacia atrás');
    } else {
      router.push('/');
      console.log('Redirigiendo a /');
    }
  };

  return (
    <header className="w-full bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 p-4 flex items-center justify-between">
      {/* Imagen de perfil */}
      <picture className="w-14 h-14 rounded-full overflow-hidden border-4 border-white">
        <img
          className="object-cover w-full h-full"
          src="https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb"
          alt="Profile"
        />
      </picture>

      {/* Botón de cerrar */}
      <button
        className="text-white text-3xl p-2 hover:text-gray-300 transition-all duration-200 ease-in-out"
        onClick={handleBack}
        aria-label="Cerrar sesión o regresar"
      >
        <IoIosCloseCircleOutline />
      </button>
    </header>
  );
}
