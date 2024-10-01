'use client';

import { useState, useEffect } from 'react';
import { MdDelete } from 'react-icons/md';
import { useRouter, } from 'next/navigation';
import { tokenExpired } from '@/utils/jwtDecode';


export default function DeleteUserButton() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = tokenExpired();
    setToken(token);
  }, []);

  const handleDelete = async () => {
    setIsLoading(true);
    setError(null);
    if (!token) return;
    try {
      const response = await fetch(`/api/deleteUser/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete user');
      }

      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      setIsOpen(false);
      router.push('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative col-span-4">
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-between w-full px-4 py-2 text-red-500 transition-colors duration-200 bg-transparent border border-red-500 rounded-lg cursor-pointer hover:bg-red-500 hover:text-white"
      >
        <span>ELIMINAR CUENTA</span>
        <MdDelete className="ml-2 text-xl" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-sm p-6 text-center rounded-lg shadow-lg bg-neutralViolet-900">
            <h2 className="mb-4 text-2xl font-bold text-neutralViolet-50">
              Confirmar eliminación de cuenta
            </h2>
            <p className="mb-6 text-neutralViolet-200">
              ¿Está seguro de que desea eliminar su cuenta? Esta acción no se
              puede deshacer.
            </p>
            <div className="flex justify-between space-x-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 transition-colors duration-200 rounded bg-neutralViolet-700 text-neutralViolet-50 hover:bg-neutralViolet-600"
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 transition-colors duration-200 bg-red-600 rounded text-neutralViolet-50 hover:bg-red-500"
                disabled={isLoading}
              >
                {isLoading ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
            {error && <p className="mt-4 text-red-500">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
