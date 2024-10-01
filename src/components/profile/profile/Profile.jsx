'use client';

import { useState, useEffect } from 'react';
import { tokenExpired } from '@/utils/jwtDecode';

const UserProfile = ({ onEditClick }) => {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null);

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
        console.log(response)
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          console.log(data);
        } 
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserData();
  }, [token]);
  console.log(userData);

  return (
    <div className="max-w-sm p-6 mx-auto bg-black rounded-lg shadow-lg text-neutralViolet-50">
      <div className="flex flex-col items-center mb-6">
        <img
          src={userData.image_Url}
          alt="Perfil"
          className="w-24 h-24 mb-2 rounded-full"
        />
        <h2 className="text-2xl font-bold">{userData.nick_Name}</h2>
      </div>

      <div className="space-y-4 text-center">
        <div>
          <p className="text-violetBlue-300">Nombre</p>
          <p className="font-semibold">{`${userData.first_Name} ${userData.last_Name}`}</p>
        </div>
        <div>
          <p className="text-violetBlue-300">Correo</p>
          <p className="font-semibold">{userData.email}</p>
        </div>
        <div>
          <p className="text-violetBlue-300">Fecha de nacimiento</p>
          <p className="font-semibold">
            {new Date(userData.birthDay_date).toLocaleDateString('es-ES')}
          </p>
        </div>
        <div>
          <p className="text-violetBlue-300">Miembro desde</p>
          <p className="font-semibold">
            {new Date(userData.created_At_dateTime).toLocaleDateString('es-ES')}
          </p>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={onEditClick}
          className="px-6 py-2 transition-colors rounded bg-violetBlue-500 text-neutralViolet-50 hover:bg-violetBlue-600"
        >
          Editar Perfil
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
