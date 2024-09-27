'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { handleCommand as cohereHandleCommand } from '@/app/IA/cohere';

const MicrophoneContext = createContext();

export const useMicrophoneContext = () => useContext(MicrophoneContext);

export const MicrophoneProvider = ({ children }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const recognitionInstance = new window.webkitSpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'es-ES';

      recognitionInstance.onresult = async (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        console.log(`Comando detectado: ${command}`);

        const response = await cohereHandleCommand(command);
        if (response) {
          speak(response);
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error('Error en el reconocimiento de voz:', event.error);
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const speak = (message) => {
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <MicrophoneContext.Provider
      value={{ isListening, startListening, stopListening }}
    >
      {children}
    </MicrophoneContext.Provider>
  );
};
