'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaEnvelope, FaLock, FaCheck, FaTimes } from 'react-icons/fa';
import Microphone from '@/components/common/navigation-bar/Microphone';

function LoginPage() {
  const router = useRouter();

  const handleNavigate = (route) => {
    router.push(route);
  };

  return (
    <section className="relative text-white h-screen p-5 flex flex-col justify-start items-center">
      <h1 className="text-3xl font-bold mb-5 z-10 mt-10">Login</h1>

      <form className="w-full max-w-sm z-10 mt-5">
        <label className="mb-4 flex items-center bg-gray-800 rounded-lg p-2.5 relative">
          <input
            type="email"
            placeholder="Correo Electrónico"
            className="w-full p-2.5 bg-transparent text-white text-lg outline-none border-none rounded-lg"
          />
          <FaEnvelope className="absolute right-2 text-gray-400" />
        </label>
        <label className="mb-4 flex items-center bg-gray-800 rounded-lg p-2.5 relative">
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-2.5 bg-transparent text-white text-lg outline-none border-none rounded-lg"
          />
          <FaLock className="absolute right-2 text-gray-400" />
        </label>
      </form>

      <section className="flex justify-between w-full max-w-sm mt-4 px-2.5 z-10">
        <button className="flex-1 mr-2 p-2.5 bg-green-500 text-white rounded flex justify-center items-center cursor-pointer">
          Aceptar <FaCheck className="ml-1.25" />
        </button>
        <button className="flex-1 ml-2 p-2.5 bg-red-600 text-white rounded flex justify-center items-center cursor-pointer">
          Cancelar <FaTimes className="ml-1.25" />
        </button>
      </section>

      <Microphone onNavigate={handleNavigate} />

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
    </section>
  );
}

export default LoginPage;
