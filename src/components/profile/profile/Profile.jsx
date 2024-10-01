'use client';

import { useState, useEffect } from 'react';
import {
  FaEnvelope,
  FaCalendar,
  FaUser,
  FaImage,
  FaClock,
  FaPen,
  FaCheck,
  FaTimes,
} from 'react-icons/fa';
import { tokenExpired } from '@/utils/jwtDecode';

const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = tokenExpired();
    setToken(token);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) return;
      try {
        const response = await fetch('/api/editUser', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          setLoading(false);
          console.log(data);
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  const handleInputChange = (key, value) => {
    setEditedData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (Object.keys(editedData).length === 0) {
      setMessage('No hay cambios para guardar');
      return;
    }

    setUpdating(true);
    setMessage('');

    try {
      const response = await fetch('/api/editUser', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedData),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage('Perfil actualizado con éxito');
        setUserData((prev) => ({ ...prev, ...editedData }));
        setEditedData({});
      } else {
        throw new Error('Error al actualizar el perfil');
      }
    } catch (error) {
      setMessage('Error al actualizar el perfil: ' + error.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-black">
        <div className="text-center">
          <div className="w-32 h-32 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
          <p className="mt-4 text-xl">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-black">
        <div className="text-center">
          <p className="text-xl text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen col-span-4 p-5 text-white bg-black">
      {/* Profile Information */}
      <section className="flex flex-col items-center">
        <div className="relative mb-4">
          <img
            className="object-cover w-32 h-32 border-4 border-white rounded-full"
            src={userData.image_Url}
            alt="Profile"
          />
          <FaPen className="absolute bottom-0 right-0 p-2 text-white bg-gray-800 rounded-full cursor-pointer" />
        </div>
        <h1 className="text-3xl font-bold">{`${userData.first_Name} ${userData.last_Name}`}</h1>
        <p className="text-gray-400">{userData.nick_Name}</p>
      </section>

      <section className="flex flex-col items-center w-full">
        {[
          {
            key: 'email',
            icon: FaEnvelope,
            label: 'Email',
            value: userData.email,
          },
          {
            key: 'birthDay_date',
            icon: FaCalendar,
            label: 'Fecha de nacimiento',
            value: new Date(userData.birthDay_date).toLocaleDateString(),
          },
          {
            key: 'state',
            icon: FaUser,
            label: 'Estado',
            value: userData.state === '1' ? 'Activo' : 'Inactivo',
          },
          {
            key: 'image_Url',
            icon: FaImage,
            label: 'URL de imagen',
            value: userData.image_Url,
          },
          {
            key: 'created_At_dateTime',
            icon: FaClock,
            label: 'Creado el',
            value: new Date(userData.created_At_dateTime).toLocaleString(),
          },
        ].map(({ key, icon: Icon, label, value }, i) => (
          <label
            key={i}
            className="relative flex items-center w-full p-2 mb-4 bg-gray-800 rounded-lg"
          >
            <Icon className="mr-2 text-gray-400" />
            <input
              type="text"
              value={editedData[key] || value}
              onChange={(e) => handleInputChange(key, e.target.value)}
              className="w-full p-2 text-base text-white bg-transparent outline-none"
            />
            <FaPen className="absolute text-gray-400 cursor-pointer right-2" />
          </label>
        ))}
      </section>

      {message && (
        <div
          className={`text-center mb-4 ${
            message.includes('Error') ? 'text-red-500' : 'text-green-500'
          }`}
        >
          {message}
        </div>
      )}

      <section className="flex justify-between w-full">
        <button
          onClick={handleSubmit}
          disabled={updating || Object.keys(editedData).length === 0}
          className={`flex items-center justify-center flex-1 p-3 mr-2 text-white rounded-lg cursor-pointer ${
            updating || Object.keys(editedData).length === 0
              ? 'bg-gray-500'
              : 'bg-green-500'
          }`}
        >
          {updating ? 'Guardando...' : 'Guardar'} <FaCheck className="ml-2" />
        </button>
        <button
          onClick={() => {
            setEditedData({});
            setMessage('');
          }}
          className="flex items-center justify-center flex-1 p-3 ml-2 text-white bg-red-500 rounded-lg cursor-pointer"
        >
          Cancelar <FaTimes className="ml-2" />
        </button>
      </section>
    </div>
  );
};

export default UserProfile;
