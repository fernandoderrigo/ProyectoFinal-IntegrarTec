'use client';

import React, { useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsOpen(false);
    router.push('/login');
  };

  return (
    <div className="relative col-span-4">
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-between w-full px-4 py-2 transition-colors duration-200 rounded-md text-neutralViolet-50 bg-violet-700 hover:bg-violet-400"
      >
        SALIR <FaSignOutAlt className="ml-2 text-xl" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-sm p-6 text-center rounded-lg shadow-lg bg-neutralViolet-900">
            <h2 className="mb-4 text-2xl font-bold text-neutralViolet-50">
              Confirmar cierre de sesión
            </h2>
            <p className="mb-6 text-neutralViolet-200">
              ¿Está seguro de que desea cerrar sesión? Esto finalizará su sesión
              actual.
            </p>
            <div className="flex justify-between space-x-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 transition-colors duration-200 rounded bg-neutralViolet-700 text-neutralViolet-50 hover:bg-neutralViolet-600"
              >
                Cancelar
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 transition-colors duration-200 rounded bg-violet-600 text-neutralViolet-50 hover:bg-violet-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
