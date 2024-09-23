'use client';

import React, { useState } from 'react';
import { FaPen, FaCheck, FaTimes, FaUpload } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Microphone from '@/components/common/navigation-bar/Microphone';
import RegisterLogin from '@/components/common/navigation-bar/LoginRegister';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nickName, setNickName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const router = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const formData = new FormData();
    formData.append('first_Name', firstName);
    formData.append('last_Name', lastName);
    formData.append('nick_Name', nickName);
    formData.append('birthDay_date', birthDate);
    formData.append('email', email);
    formData.append('password', password);
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Usuario registrado:', result);
        router.push('/login');
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error registrando usuario:', error);
      alert('Error del servidor');
    }
  };

  return (
    <>
      <article className="relative flex flex-col items-center justify-between h-screen col-span-4 p-5 text-white">
        <RegisterLogin />

        {/* Input Fields */}
        <section className="z-10 flex flex-col items-center w-full mt-5">
          {/* Nombre */}
          <label className="flex items-center mb-2 w-full max-w-md bg-gray-800 rounded-lg p-2.5 relative">
            <input
              type="text"
              placeholder="Nombre"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-2.5 bg-transparent text-white text-lg outline-none border-none rounded-lg"
            />
            <FaPen className="absolute text-gray-400 right-2" />
          </label>

          {/* Apellido */}
          <label className="flex items-center mb-2 w-full max-w-md bg-gray-800 rounded-lg p-2.5 relative">
            <input
              type="text"
              placeholder="Apellido"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-2.5 bg-transparent text-white text-lg outline-none border-none rounded-lg"
            />
            <FaPen className="absolute text-gray-400 right-2" />
          </label>

          {/* Nickname */}
          <label className="flex items-center mb-2 w-full max-w-md bg-gray-800 rounded-lg p-2.5 relative">
            <input
              type="text"
              placeholder="Nickname"
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
              className="w-full p-2.5 bg-transparent text-white text-lg outline-none border-none rounded-lg"
            />
            <FaPen className="absolute text-gray-400 right-2" />
          </label>

          {/* Fecha de Nacimiento */}
          <label className="flex items-center mb-2 w-full max-w-md bg-gray-800 rounded-lg p-2.5 relative">
            <input
              type="date"
              placeholder="Fecha de Nacimiento"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full p-2.5 bg-transparent text-white text-lg outline-none border-none rounded-lg"
            />
            <FaPen className="absolute text-gray-400 right-2" />
          </label>

          {/* Email */}
          <label className="flex items-center mb-2 w-full max-w-md bg-gray-800 rounded-lg p-2.5 relative">
            <input
              type="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 bg-transparent text-white text-lg outline-none border-none rounded-lg"
            />
            <FaPen className="absolute text-gray-400 right-2" />
          </label>

          {/* Contraseña */}
          <label className="flex items-center mb-2 w-full max-w-md bg-gray-800 rounded-lg p-2.5 relative">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 bg-transparent text-white text-lg outline-none border-none rounded-lg"
            />
            <FaPen className="absolute text-gray-400 right-2" />
          </label>

          {/* Confirmar Contraseña */}
          <label className="flex items-center mb-2 w-full max-w-md bg-gray-800 rounded-lg p-2.5 relative">
            <input
              type="password"
              placeholder="Confirmar Contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2.5 bg-transparent text-white text-lg outline-none border-none rounded-lg"
            />
            <FaPen className="absolute text-gray-400 right-2" />
          </label>
          {/* Nuevo campo para subir imagen */}
          <label className="flex items-center mb-2 w-full max-w-md bg-gray-800 rounded-lg p-2.5 relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="profileImageInput"
              name="image_Url"
            />
            <div className="w-full p-2.5 bg-transparent text-white text-lg outline-none border-none rounded-lg flex items-center justify-between">
              <span>
                {profileImage ? profileImage.name : 'Subir imagen de perfil'}
              </span>
              <FaUpload className="text-gray-400" />
            </div>
          </label>

          {/* Previsualización de la imagen */}
          {previewImage && (
            <div className="w-full max-w-md mb-2">
              <img
                src={previewImage}
                alt="Vista previa"
                className="object-cover w-full h-40 rounded-lg"
              />
            </div>
          )}
        </section>

        {/* Action Buttons */}
        <div className="flex justify-between w-full max-w-sm mt-4 px-2.5 z-10">
          <button
            className="flex-1 mr-2 p-2.5 bg-green-500 text-white rounded flex justify-center items-center cursor-pointer"
            onClick={handleRegister}
          >
            Aceptar <FaCheck className="ml-1.25" />
          </button>
          <button
            className="flex-1 ml-2 p-2.5 bg-red-600 text-white rounded flex justify-center items-center cursor-pointer"
            onClick={() => router.push('/')}
          >
            Cancelar <FaTimes className="ml-1.25" />
          </button>
        </div>

        <Microphone />

        {/* Fondo estrellado */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="relative w-full h-full bg-gradient-to-b from-blue-900 via-blue-800 to-black">
            {Array(50)
              .fill(0)
              .map((_, index) => (
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
            0%,
            100% {
              opacity: 0.2;
            }
            50% {
              opacity: 1;
            }
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
    </>
  );
}
