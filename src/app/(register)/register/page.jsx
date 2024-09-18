'use client';

import React, { useState } from 'react';
import { FaPen, FaCheck, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Microphone from '@/components/common/navigation-bar/Microphone';

export default function Register() {
  const [backgroundStyle] = useState({ backgroundColor: 'black', backgroundImage: 'none' });
  const router = useRouter();

  const handleNavigate = (route) => {
    router.push(route);
  };

  return (
    <article className="relative text-white h-screen p-5 flex flex-col justify-between items-center" style={backgroundStyle}>
      {/* Input Fields */}
      <section className="w-full flex flex-col items-center z-10 mt-5">
        {/* Nombre */}
        <label className="flex items-center mb-2 w-full max-w-md bg-gray-800 rounded-lg p-2.5 relative">
          <input type="text" placeholder="Nombre" className="w-full p-2.5 bg-transparent text-white text-lg outline-none border-none rounded-lg" />
          <FaPen className="absolute right-2 text-gray-400" />
        </label>

        {/* Apellido */}
        <label className="flex items-center mb-2 w-full max-w-md bg-gray-800 rounded-lg p-2.5 relative">
          <input type="text" placeholder="Apellido" className="w-full p-2.5 bg-transparent text-white text-lg outline-none border-none rounded-lg" />
          <FaPen className="absolute right-2 text-gray-400" />
        </label>

        {/* Email */}
        <label className="flex items-center mb-2 w-full max-w-md bg-gray-800 rounded-lg p-2.5 relative">
          <input type="email" placeholder="Correo Electrónico" className="w-full p-2.5 bg-transparent text-white text-lg outline-none border-none rounded-lg" />
          <FaPen className="absolute right-2 text-gray-400" />
        </label>

        {/* Contraseña */}
        <label className="flex items-center mb-2 w-full max-w-md bg-gray-800 rounded-lg p-2.5 relative">
          <input type="password" placeholder="Contraseña" className="w-full p-2.5 bg-transparent text-white text-lg outline-none border-none rounded-lg" />
          <FaPen className="absolute right-2 text-gray-400" />
        </label>

        {/* Confirmar Contraseña */}
        <label className="flex items-center mb-2 w-full max-w-md bg-gray-800 rounded-lg p-2.5 relative">
          <input type="password" placeholder="Confirmar Contraseña" className="w-full p-2.5 bg-transparent text-white text-lg outline-none border-none rounded-lg" />
          <FaPen className="absolute right-2 text-gray-400" />
        </label>
      </section>

      {/* Action Buttons */}
      <div className="flex justify-between w-full max-w-sm mt-4 px-2.5 z-10">
        <button
          className="flex-1 mr-2 p-2.5 bg-green-500 text-white rounded flex justify-center items-center cursor-pointer"
          onClick={() => handleVoiceCommand('aceptar')}
        >
          Aceptar <FaCheck className="ml-1.25" />
        </button>
        <button
          className="flex-1 ml-2 p-2.5 bg-red-600 text-white rounded flex justify-center items-center cursor-pointer"
          onClick={() => handleVoiceCommand('cancelar')}
        >
          Cancelar <FaTimes className="ml-1.25" />
        </button>
      </div>

      {/* Añadir el componente Microphone */}
      <Microphone
        onNavigate={handleNavigate}
        onColorChange={null} // Puedes pasar una función o null si no la necesitas
        onBackgroundChange={null} // Lo mismo para esta función
      />

      {/* Fondo estrellado */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="relative h-full w-full bg-gradient-to-b from-blue-900 via-blue-800 to-black">
          {Array(50).fill(0).map((_, index) => (
            <div
              key={index}
              className="star"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        .star {
          width: 2px;
          height: 2px;
          background-color: white;
          border-radius: 50%;
          position: absolute;
          animation: twinkle 2s infinite;
        }
        .star:nth-child(odd) {
          animation-duration: 3s;
        }
        .star:nth-child(even) {
          animation-duration: 1.5s;
        }
      `}</style>
    </article>
  );
}
