import React from 'react';
import { FaPen, FaCheck, FaTimes, FaMicrophone } from 'react-icons/fa';

export default function Register() {
  return (
    <div className="bg-black text-white h-screen p-5 flex flex-col justify-between items-center">
      {/* Profile Picture and Close Icon */}
      <div className="w-full flex justify-center items-center relative">
        <div className="w-16 h-16 bg-gray-500 rounded-full mb-5"></div>
        <button className="absolute top-0 right-0 bg-transparent border-none text-white text-2xl cursor-pointer">
          ✖
        </button>
      </div>

      {/* Input Fields */}
      <div className="w-full flex flex-col items-center">
        {/* Nombre */}
        <div className="flex items-center mb-2.5 w-full bg-gray-800 rounded p-2.5 relative">
          <input type="text" placeholder="Nombre" className="w-full p-2.5 bg-transparent text-white text-lg outline-none border-none" />
          <FaPen className="absolute right-2 text-gray-400" />
        </div>

        {/* Apellido */}
        <div className="flex items-center mb-2.5 w-full bg-gray-800 rounded p-2.5 relative">
          <input type="text" placeholder="Apellido" className="w-full p-2.5 bg-transparent text-white text-lg outline-none border-none" />
          <FaPen className="absolute right-2 text-gray-400" />
        </div>

        {/* Email */}
        <div className="flex items-center mb-2.5 w-full bg-gray-800 rounded p-2.5 relative">
          <input type="email" placeholder="Correo Electrónico" className="w-full p-2.5 bg-transparent text-white text-lg outline-none border-none" />
          <FaPen className="absolute right-2 text-gray-400" />
        </div>

        {/* Contraseña */}
        <div className="flex items-center mb-2.5 w-full bg-gray-800 rounded p-2.5 relative">
          <input type="password" placeholder="Contraseña" className="w-full p-2.5 bg-transparent text-white text-lg outline-none border-none" />
          <FaPen className="absolute right-2 text-gray-400" />
        </div>

        {/* Confirmar Contraseña */}
        <div className="flex items-center mb-2.5 w-full bg-gray-800 rounded p-2.5 relative">
          <input type="password" placeholder="Confirmar Contraseña" className="w-full p-2.5 bg-transparent text-white text-lg outline-none border-none" />
          <FaPen className="absolute right-2 text-gray-400" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between w-full px-2.5">
        <button className="flex-1 mr-1.25 p-2.5 bg-green-500 text-white rounded flex justify-center items-center cursor-pointer">
          Aceptar <FaCheck className="ml-1.25" />
        </button>
        <button className="flex-1 ml-1.25 p-2.5 bg-red-600 text-white rounded flex justify-center items-center cursor-pointer">
          Cancelar <FaTimes className="ml-1.25" />
        </button>
      </div>
    </div>
  );
}
