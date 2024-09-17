'use client';

import React, { useState } from 'react';
import { FaPen, FaCheck, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Microphone from '@/components/common/navigation-bar/Microphone'; 

export default function Register() {
  const [backgroundStyle, setBackgroundStyle] = useState({ backgroundColor: 'black', backgroundImage: 'none' });
  const router = useRouter(); 

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
    router.push(route); 
  };

  return (
    <article className="text-white h-screen p-5 flex flex-col justify-between items-center" style={backgroundStyle}>
      {/* Profile Picture and Close Icon */}

      {/* Input Fields */}
      <section className="w-full flex flex-col items-center">
        {/* Nombre */}
        <label className="flex items-center mb-2.5 w-full bg-gray-800 rounded p-2.5 relative">
          <input type="text" placeholder="Nombre" className="w-full p-2.5 bg-transparent text-white text-lg outline-none border-none" />
          <FaPen className="absolute right-2 text-gray-400" />
        </label>

        {/* Apellido */}
        <label className="flex items-center mb-2.5 w-full bg-gray-800 rounded p-2.5 relative">
          <input type="text" placeholder="Apellido" className="w-full p-2.5 bg-transparent text-white text-lg outline-none border-none" />
          <FaPen className="absolute right-2 text-gray-400" />
        </label>

        {/* Email */}
        <label className="flex items-center mb-2.5 w-full bg-gray-800 rounded p-2.5 relative">
          <input type="email" placeholder="Correo Electrónico" className="w-full p-2.5 bg-transparent text-white text-lg outline-none border-none" />
          <FaPen className="absolute right-2 text-gray-400" />
        </label>

        {/* Contraseña */}
        <label className="flex items-center mb-2.5 w-full bg-gray-800 rounded p-2.5 relative">
          <input type="password" placeholder="Contraseña" className="w-full p-2.5 bg-transparent text-white text-lg outline-none border-none" />
          <FaPen className="absolute right-2 text-gray-400" />
        </label>

        {/* Confirmar Contraseña */}
        <label className="flex items-center mb-2.5 w-full bg-gray-800 rounded p-2.5 relative">
          <input type="password" placeholder="Confirmar Contraseña" className="w-full p-2.5 bg-transparent text-white text-lg outline-none border-none" />
          <FaPen className="absolute right-2 text-gray-400" />
        </label>
      </section>

      {/* Action Buttons */}
      <div className="flex justify-between w-full px-2.5">
        <button className="flex-1 mr-1.25 p-2.5 bg-green-500 text-white rounded flex justify-center items-center cursor-pointer">
          Aceptar <FaCheck className="ml-1.25" />
        </button>
        <button className="flex-1 ml-1.25 p-2.5 bg-red-600 text-white rounded flex justify-center items-center cursor-pointer">
          Cancelar <FaTimes className="ml-1.25" />
        </button>
      </div>

      {/* Microphone Icon */}
      <div className="mt-5 p-5">
        <Microphone
          onNavigate={handleNavigate} 
          onColorChange={handleColorChange}
          onBackgroundChange={handleBackgroundChange} // Asegúrate de pasar esta función
        />
      </div>
    </article>
  );
}
