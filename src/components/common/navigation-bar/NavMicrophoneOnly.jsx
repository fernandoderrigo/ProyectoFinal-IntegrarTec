'use client';

import React from 'react';
import useMicrophone from '@/hooks/useMicrophone';
import Microphone from './Microphone';
import { useState } from 'react';

export default function NavMicrophoneOnly() {
  const [backgroundStyle, setBackgroundStyle] = useState({});
  const { isListening, startListening, stopListening } = useMicrophone();
  const [color, setColor] = useState('white');

  const handleClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Función para la navegación basada en comandos
  const handleNavigate = (route) => {
    router.push(route); // Usa push desde next/navigation
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
      <ul className="grid w-full grid-cols-5 gap-4 px-4 pb-1 pt-7 bg-black/70">
        <li className="flex items-center justify-center col-start-3">
          <button onClick={handleClick}>
            <Microphone
              className={`${isListening ? 'text-green-500' : 'text-white'}`}
              onNavigate={handleNavigate}
              onColorChange={handleColorChange}
              onBackgroundChange={handleBackgroundChange}
            />
          </button>
        </li>
      </ul>
    </nav>
  );
}
