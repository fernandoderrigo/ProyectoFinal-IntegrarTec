'use client';

import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useRouter, usePathname } from 'next/navigation'; // Importar hooks desde next/navigation
import { useEffect, useState } from 'react';

export default function HeaderProfile() {
  const router = useRouter();
  const pathname = usePathname();
  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    // Si hay más de una entrada en el historial, significa que hay historial de navegación
    if (window.history.length > 1) {
      setHasNavigated(true);
      console.log('Hay historial dentro de la app');
    } else {
      console.log('No hay historial dentro de la app');
    }
  }, []);

  const handleBack = () => {
    if (hasNavigated) {
      router.back(); // Navegar a la página anterior
      console.log('Navegando hacia atrás');
    } else {
      router.push('http://localhost:3000/');
      console.log('Redirigiendo a /');
    }
  };

  return (
    <header className="grid grid-cols-3 gap-4 basic-header bg-gradient-to-b from-indigo-500 justify-items-center pt-7 pb-5">
      <picture className='col-start-1 p-3 w-11/12 aspect-square overflow-hidden rounded-full'>
        <img className='object-cover w-full aspect-square rounded-full border-4 border-black' src="https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb" alt="Profile" />
      </picture>
      <button className='col-start-3 justify-self-end place-self-start mr-10 mt-5' onClick={handleBack}>
        <IoIosCloseCircleOutline className='basic-button' />
      </button>
    </header>
  );
}
