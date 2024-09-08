import React from 'react';
import { FaMusic, FaUserEdit } from 'react-icons/fa';
import { MdSettings, MdDelete, MdKeyboardVoice } from 'react-icons/md';

const LINKS = [
  {
    path: '/acerca-de-nosotros',
    icon: <FaMusic />,
    label: 'Acerca de nosotros',
  },
  {
    path: '/editar-perfil',
    icon: <FaUserEdit />,
    label: 'Editar perfil',
  },
  {
    path: '/configuracion',
    icon: <MdSettings />,
    label: 'Configuración',
  },
];

export default function Sidebar() {
  return (
    <nav className="w-full h-full bg-black text-white p-2.5 flex flex-col justify-between">
      {/* Profile Section */}
      <div className="flex items-center justify-between bg-gray-800 p-2.5 rounded-lg mb-5">
        <div className="w-12 h-12 bg-gray-500 rounded-full"></div>
        <span className="ml-2 flex-1">Nombre</span>
        <button className="bg-transparent border-none text-white text-xl cursor-pointer">
          ✖
        </button>
      </div>

      {/* Menu Items */}
      <ul className="list-none p-0 m-0 flex-1 overflow-y-auto">
        {LINKS.map(({ icon, path, label }) => (
          <li key={path} className="mb-2">
            <a href={path} className="flex items-center justify-between text-white text-base py-2 px-3 bg-gray-800 rounded-lg hover:bg-gray-700">
              <span>{label}</span>
              <span className="text-gray-400">{icon}</span>
            </a>
          </li>
        ))}
      </ul>

      {/* Delete Account Button */}
      <button className="flex items-center text-red-500 bg-transparent border border-red-500 rounded-lg py-2 px-3 cursor-pointer mt-5 hover:bg-red-500 hover:text-white">
        ELIMINAR CUENTA <MdDelete className="ml-2 text-xl" />
      </button>

      {/* Microphone Icon */}
      <div className="flex justify-center p-5">
        <MdKeyboardVoice className="text-white text-2xl" />
      </div>
    </nav>
  );
}
