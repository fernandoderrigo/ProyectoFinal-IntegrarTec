'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaEnvelope, FaLock, FaCheck, FaTimes } from 'react-icons/fa';

function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [backgroundStyle, setBackgroundStyle] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  useEffect(() => {
    setBackgroundStyle({
      backgroundImage: 'none',
    });
  }, []);

  return (
    <section className="relative text-white h-screen p-5 flex flex-col justify-start items-center" style={backgroundStyle}>
      <h1 className="text-3xl font-bold mb-5 z-10 mt-10">Login</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-sm z-10 mt-5">
        <label className="mb-4 flex items-center bg-gray-800 rounded-lg p-2.5 relative"> {/* Redondeo añadido */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo Electrónico"
            className="w-full p-2.5 bg-transparent text-white text-lg outline-none border-none rounded-lg" /> {/* Redondeo añadido */}
          <FaEnvelope className="absolute right-2 text-gray-400" />
        </label>
        <label className="mb-4 flex items-center bg-gray-800 rounded-lg p-2.5 relative"> {/* Redondeo añadido */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="w-full p-2.5 bg-transparent text-white text-lg outline-none border-none rounded-lg" /> {/* Redondeo añadido */}
          <FaLock className="absolute right-2 text-gray-400" />
        </label>
      </form>

      <section className="flex justify-between w-full max-w-sm mt-4 px-2.5 z-10"> {/* Ajustado margen superior */}
        <button className="flex-1 mr-2 p-2.5 bg-green-500 text-white rounded flex justify-center items-center cursor-pointer">
          Aceptar <FaCheck className="ml-1.25" />
        </button>
        <button className="flex-1 ml-2 p-2.5 bg-red-600 text-white rounded flex justify-center items-center cursor-pointer">
          Cancelar <FaTimes className="ml-1.25" />
        </button>
      </section>

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
