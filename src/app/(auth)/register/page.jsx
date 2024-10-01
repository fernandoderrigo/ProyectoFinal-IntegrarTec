'use client';

import React, { useRef } from 'react';
import { FaPen, FaCheck, FaTimes, FaUpload } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import RegisterLogin from '@/components/common/navigation-bar/LoginRegister';

export default function Register() {
  const firstNameRef = useRef('');
  const lastNameRef = useRef('');
  const nickNameRef = useRef('');
  const birthDateRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const confirmPasswordRef = useRef('');
  const profileImageRef = useRef(null);
  const [previewImage, setPreviewImage] = React.useState('');
  const router = useRouter();

  // Array de estrellas que se generará una sola vez
  const stars = Array.from({ length: 50 }).map((_, index) => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    key: index,
  }));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      profileImageRef.current = file;
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = async () => {
    if (passwordRef.current !== confirmPasswordRef.current) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const formData = new FormData();
    formData.append('first_Name', firstNameRef.current);
    formData.append('last_Name', lastNameRef.current);
    formData.append('nick_Name', nickNameRef.current);
    formData.append('birthDay_date', birthDateRef.current);
    formData.append('email', emailRef.current);
    formData.append('password', passwordRef.current);
    if (profileImageRef.current) {
      formData.append('image_Url', profileImageRef.current);
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

        <section className="z-10 flex flex-col items-center w-full mt-5">
          <label className="flex items-center mb-2 w-full max-w-md bg-gray-800 rounded-lg p-2.5 relative">
            <input
              type="text"
              placeholder="Nombre"
              onChange={(e) => (firstNameRef.current = e.target.value)}
              className="w-full p-2.5 bg-transparent text-white text-lg outline-none border-none rounded-lg"
            />
            <FaPen className="absolute text-gray-400 right-2" />
          </label>
          <label className="flex items-center mb-2 w-full max-w-md bg-gray-800 rounded-lg p-2.5 relative">
            <input
              type="text"
              placeholder="Apellido"
              onChange={(e) => (lastNameRef.current = e.target.value)}
              className="w-full p-2.5 bg-transparent text-white text-lg outline-none border-none rounded-lg"
            />
            <FaPen className="absolute text-gray-400 right-2" />
          </label>

          <label className="flex items-center mb-2 w-full max-w-md bg-gray-800 rounded-lg p-2.5 relative">
            <input
              type="text"
              placeholder="Nickname"
              onChange={(e) => (nickNameRef.current = e.target.value)}
              className="w-full p-2.5 bg-transparent text-white text-lg outline-none border-none rounded-lg"
            />
            <FaPen className="absolute text-gray-400 right-2" />
          </label>

          <label className="flex items-center mb-2 w-full max-w-md bg-gray-800 rounded-lg p-2.5 relative">
            <input
              type="date"
              onChange={(e) => (birthDateRef.current = e.target.value)}
              className="w-full p-2.5 bg-transparent text-white text-lg outline-none border-none rounded-lg"
            />
            <FaPen className="absolute text-gray-400 right-2" />
          </label>

          <label className="flex items-center mb-2 w-full max-w-md bg-gray-800 rounded-lg p-2.5 relative">
            <input
              type="email"
              placeholder="Correo Electrónico"
              onChange={(e) => (emailRef.current = e.target.value)}
              className="w-full p-2.5 bg-transparent text-white text-lg outline-none border-none rounded-lg"
            />
            <FaPen className="absolute text-gray-400 right-2" />
          </label>

          <label className="flex items-center mb-2 w-full max-w-md bg-gray-800 rounded-lg p-2.5 relative">
            <input
              type="password"
              placeholder="Contraseña"
              onChange={(e) => (passwordRef.current = e.target.value)}
              className="w-full p-2.5 bg-transparent text-white text-lg outline-none border-none rounded-lg"
            />
            <FaPen className="absolute text-gray-400 right-2" />
          </label>

          <label className="flex items-center mb-2 w-full max-w-md bg-gray-800 rounded-lg p-2.5 relative">
            <input
              type="password"
              placeholder="Confirmar Contraseña"
              onChange={(e) => (confirmPasswordRef.current = e.target.value)}
              className="w-full p-2.5 bg-transparent text-white text-lg outline-none border-none rounded-lg"
            />
            <FaPen className="absolute text-gray-400 right-2" />
          </label>

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
                {profileImageRef.current ? profileImageRef.current.name : 'Subir imagen de perfil'}
              </span>
              <FaUpload className="text-gray-400" />
            </div>
          </label>

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

        {/* Fondo estrellado */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="relative w-full h-full bg-gradient-to-b from-blue-900 via-blue-800 to-black">
            {stars.map(({ key, top, left }) => (
              <div
                key={key}
                className="star"
                style={{
                  top: top,
                  left: left,
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
