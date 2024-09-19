'use client';  // Marca este componente como un componente cliente

import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';
import { GoHomeFill } from 'react-icons/go';
import { ImBooks } from 'react-icons/im';
import { PiMusicNotesPlusFill } from 'react-icons/pi';
import { useRouter } from 'next/navigation';  // Cambiado a next/navigation
import { useState } from 'react';
import Microphone from './Microphone';

export default function NavBar() {
  const router = useRouter();
  const [backgroundStyle, setBackgroundStyle] = useState({});
  const [color, setColor] = useState('white');

  // Función para la navegación basada en comandos
  const handleNavigate = (route) => {
    router.push(route);  // Usa push desde next/navigation
  };

  // Función para cambiar el color de fondo del body
  const handleColorChange = (newColor) => {
    document.body.style.backgroundColor = newColor;
    setColor(newColor); // Puedes usar el color para otro propósito si lo deseas
  };

  // Función para cambiar el fondo
  const handleBackgroundChange = (style) => {
    setBackgroundStyle(style);
    document.body.style.backgroundImage = style.backgroundImage;
    document.body.style.backgroundColor = style.backgroundColor;
  };

  return (
    <nav className="w-full">
      <ul className="grid w-full grid-cols-5 gap-4 px-4 pb-1 pt-4 mt-2 bg-black/20 to-transparent">
        <li className="flex items-center justify-center basic-button">
          <Link href="/search">
            <FaSearch className="" />
          </Link>
        </li>
        <li className="flex items-center justify-center basic-button">
          <Link href="/home">
            <GoHomeFill className="" />
          </Link>
        </li>
        <li className="flex items-center justify-center">
          <button>
            <Microphone 
              onNavigate={handleNavigate} 
              onColorChange={handleColorChange} 
              onBackgroundChange={handleBackgroundChange}
            />
          </button>
        </li>
        <li className="flex items-center justify-center basic-button">
          <Link href="/my-playlists">
            <ImBooks className="" />
          </Link>
        </li>
        <li className="flex items-center justify-center basic-button">
          <Link href="/my-creations">
            <PiMusicNotesPlusFill className="" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}