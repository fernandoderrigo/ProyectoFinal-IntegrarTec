'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEnvelope, FaLock, FaCheck, FaTimes } from 'react-icons/fa';
import Microphone from '@/components/common/navigation-bar/Microphone';

function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [backgroundStyle, setBackgroundStyle] = useState({ backgroundColor: 'black' }); // Estado para color o imagen de fondo

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de autenticación
    router.push('/dashboard'); 
  };

  const handleBackgroundChange = (background) => {
    setBackgroundStyle(background); 
  };

  return (
    <section className="text-white h-screen p-5 flex flex-col justify-between items-center" style={backgroundStyle}>
      <h1 className="text-3xl font-bold mb-5">Login</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <label className="mb-4 flex items-center bg-gray-800 rounded p-2.5 relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo Electrónico"
            className="w-full p-2.5 bg-transparent text-white text-lg outline-none border-none"
          />
          <FaEnvelope className="absolute right-2 text-gray-400" />
        </label>
        <label className="mb-4 flex items-center bg-gray-800 rounded p-2.5 relative">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="w-full p-2.5 bg-transparent text-white text-lg outline-none border-none"
          />
          <FaLock className="absolute right-2 text-gray-400" />
        </label>
        <button type="submit" className="w-full p-2.5 bg-green-500 text-white rounded flex justify-center items-center cursor-pointer">
          Login <FaCheck className="ml-2" />
        </button>
      </form>

      <section className="flex justify-between w-full max-w-sm mt-5 px-2.5">
        <button className="flex-1 mr-1.25 p-2.5 bg-green-500 text-white rounded flex justify-center items-center cursor-pointer">
          Aceptar <FaCheck className="ml-1.25" />
        </button>
        <button className="flex-1 ml-1.25 p-2.5 bg-red-600 text-white rounded flex justify-center items-center cursor-pointer">
          Cancelar <FaTimes className="ml-1.25" />
        </button>
      </section>

      <section className="mt-5 p-5">
        <Microphone
          onNavigate={(route) => router.push(route)}
          onColorChange={(color) => setBackgroundStyle({ backgroundColor: color, backgroundImage: 'none' })}
          onBackgroundChange={handleBackgroundChange} // Nuevo callback para manejar el cambio de fondo
        />
      </section>
    </section>
  );
}

export default LoginPage;