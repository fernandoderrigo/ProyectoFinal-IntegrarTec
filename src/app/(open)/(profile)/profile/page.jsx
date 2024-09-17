'use client';

import React, { useState } from 'react';
import { FaMusic, FaUserEdit } from 'react-icons/fa';
import { MdSettings, MdDelete, MdKeyboardVoice } from 'react-icons/md';
import Link from 'next/link';
import Microphone from '@/components/common/navigation-bar/Microphone'; // Asegúrate de que el path es correcto

const LINKS = [
  {
    path: '/profile/history',
    icon: <FaMusic />,
    label: 'Historial',
  },
  {
    path: '/profile/edit',
    icon: <FaUserEdit />,
    label: 'Editar perfil',
  },
  {
    path: '/profile/user-setting',
    icon: <MdSettings />,
    label: 'Configuración',
  },
];

export default function Profile() {
  const [backgroundStyle, setBackgroundStyle] = useState({ backgroundColor: 'black', backgroundImage: 'none' });

  const handleColorChange = (color) => {
    setBackgroundStyle(prevStyle => ({
      ...prevStyle,
      backgroundColor: color,
      backgroundImage: 'none' // Asegúrate de que no haya imagen de fondo si solo se cambia el color
    }));
  };

  const handleBackgroundChange = (background) => {
    setBackgroundStyle(prevStyle => ({
      ...prevStyle,
      ...background // Permite la adición de imágenes de fondo
    }));
  };

  const handleNavigate = (route) => {
    window.location.href = route; // Usa window.location para la navegación
  };

  return (
    <section className='grid grid-cols-4 gap-4 px-4 col-span-4 bg-violetBlue-900/30 rounded-3xl p-5' style={backgroundStyle}>
      <nav className="col-span-4 p-2.5 grid grid-rows-3fr_1fr_1fr gap-4">
        {/* Menu Items */}
        <ul className="grid grid-rows-3 gap-4 p-0 m-0 overflow-y-auto list-none">
          {LINKS.map(({ icon, path, label }) => (
            <li key={path} className="mb-2">
              <Link href={path} className="flex items-center justify-between px-3 py-2 text-base text-white bg-gray-800 rounded-lg hover:bg-gray-700">
                <span>{label}</span>
                <span className="text-gray-400">{icon}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Delete Account Button */}
        <button className="flex justify-between px-3 py-2 text-red-500 bg-transparent border border-red-500 rounded-lg cursor-pointer hover:bg-red-500 hover:text-white">
          ELIMINAR CUENTA <MdDelete className="ml-2 text-xl" />
        </button>
        <button className="flex justify-between px-3 py-2 text-white bg-transparent border border-white rounded-lg cursor-pointer hover:bg-red-500 hover:text-white">
          SALIR <MdDelete className="ml-2 text-xl" />
        </button>
      </nav>

      {/* Microphone Icon */}
      <div className='fixed bottom-5 right-5'>
        <Microphone
          onNavigate={handleNavigate}
          onColorChange={handleColorChange}
          onBackgroundChange={handleBackgroundChange}
        />
      </div>
    </section>
  );
}
