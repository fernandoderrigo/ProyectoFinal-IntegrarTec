'use client';

import React from 'react';
import { MdKeyboardVoice } from 'react-icons/md';
import useMicrophone from '@/hooks/useMicrophone';
import Microphone from './Microphone';

export default function NavMicrophoneOnly() {
  const { startListening, stopListening, isListening } = useMicrophone();

  const handleClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <nav className="w-full">
      <ul className="grid w-full grid-cols-5 gap-4 px-4 pb-1 pt-7 bg-black/70">
        <li className="flex items-center justify-center col-start-3">
          <button onClick={handleClick}>
            <Microphone
              className={`text-5xl ${
                isListening ? 'text-green-500' : 'text-white'
              }`}
              onNavigate={handleNavigate}
              onColorChange={null} // Puedes pasar una función o null si no la necesitas
              onBackgroundChange={null}
            />
          </button>
        </li>
      </ul>
    </nav>
  );
}
