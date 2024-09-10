import React from 'react';
import { FaMusic, FaUserEdit } from 'react-icons/fa';
import { MdSettings, MdDelete, MdKeyboardVoice } from 'react-icons/md';

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

export default function Sidebar() {
  return (
    <nav className="w-full h-full bg-black text-white p-2.5 flex flex-col justify-between">
      {/* Profile Section */}
      <div className="flex items-center justify-between bg-gray-800 p-2.5 rounded-lg mb-5">
        <div className="w-12 h-12 bg-gray-500 rounded-full"></div>
        <span className="flex-1 ml-2">Nombre</span>
        <button className="text-xl text-white bg-transparent border-none cursor-pointer">
          ✖
        </button>
      </div>

      {/* Menu Items */}
      <ul className="flex-1 p-0 m-0 overflow-y-auto list-none">
        {LINKS.map(({ icon, path, label }) => (
          <li key={path} className="mb-2">
            <a href={path} className="flex items-center justify-between px-3 py-2 text-base text-white bg-gray-800 rounded-lg hover:bg-gray-700">
              <span>{label}</span>
              <span className="text-gray-400">{icon}</span>
            </a>
          </li>
        ))}
      </ul>

      {/* Delete Account Button */}
      <button className="flex items-center px-3 py-2 mt-5 text-red-500 bg-transparent border border-red-500 rounded-lg cursor-pointer hover:bg-red-500 hover:text-white">
        ELIMINAR CUENTA <MdDelete className="ml-2 text-xl" />
      </button>

      {/* Microphone Icon */}
      <div className="flex justify-center p-5">
        <MdKeyboardVoice className="text-2xl text-white" />
      </div>
    </nav>
  );
}
