'use client';

import React from 'react';
import { MdKeyboardVoice } from 'react-icons/md';
import useMicrophone from '@/hooks/useMicrophone';


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
            <MdKeyboardVoice className={`text-5xl ${isListening ? 'text-green-500' : 'text-white'}`} />
          </button>
        </li>
      </ul>
    </nav>
  );
}
