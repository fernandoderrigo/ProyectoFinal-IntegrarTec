'use client';

import React, { useEffect, useState } from 'react';
import { MdMic, MdMicOff } from 'react-icons/md'; // Iconos para micrófono encendido y apagado
import { handleCommand as cohereHandleCommand } from '@/app/IA/cohere';

const colorDictionary = {
  'azul': 'blue',
  'negro': 'black',
  'marrón': 'brown',
  'chocolate': 'chocolate',
  'dorado': 'gold',
  'gris': 'gray',
  'verde': 'green',
  'naranja': 'orange',
  'rosa': 'pink',
  'rojo': 'red',
  'salmón': 'salmon',
  'plata': 'silver',
  'nieve': 'snow',
  'arena': 'tan',
  'violeta': 'violet',
  'blanco': 'white',
  'amarillo': 'yellow'
};

const navigationCommands = {
  'ir a login': '/login',
  'ir a registro': '/register',
  'ir a inicio': '/home',
  'ir a perfil': '/profile',
  'ir a playlist': '/my-playlists',
  'ir a buscar': '/search',
  'ir a editar perfil': '/profile/edit',
  'ir a historial': '/history',
};

const backgroundImages = {
  'comida': 'url("https://escuchafacil.s3.us-east-2.amazonaws.com/comida.gif")',
  'estrella': 'url("https://escuchafacil.s3.us-east-2.amazonaws.com/estrella.gif")',
  'chill': 'url("https://escuchafacil.s3.us-east-2.amazonaws.com/fondo1.webp")',
  'anime': 'url("https://escuchafacil.s3.us-east-2.amazonaws.com/fondo2.webp")',
  'futuro': 'url("https://escuchafacil.s3.us-east-2.amazonaws.com/futuro.gif")',
  'gamer': 'url("https://escuchafacil.s3.us-east-2.amazonaws.com/gamer.gif")',
  'halloween': 'url("https://escuchafacil.s3.us-east-2.amazonaws.com/halloween.gif")',
  'kirby': 'url("https://escuchafacil.s3.us-east-2.amazonaws.com/kirby.gif")',
  'lago': 'url("https://escuchafacil.s3.us-east-2.amazonaws.com/lago.gif")',
  'lluvia': 'url("https://escuchafacil.s3.us-east-2.amazonaws.com/lluvia.gif")',
  'mario': 'url("https://escuchafacil.s3.us-east-2.amazonaws.com/mario.gif")',
  'otaku': 'url("https://escuchafacil.s3.us-east-2.amazonaws.com/otaku.gif")',
  'computadora': 'url("https://escuchafacil.s3.us-east-2.amazonaws.com/pc.gif")',
};

const Microphone = ({ onNavigate, onColorChange, onBackgroundChange }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [hasSpoken, setHasSpoken] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true); // Estado para manejar el micrófono

  useEffect(() => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.continuous = true;
    recognition.interimResults = false;

    const handleRecognitionResult = async (event) => {
      if (isSpeaking || !isMicOn) return; // Verifica si el micrófono está apagado

      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }

      const command = event.results[0][0].transcript.toLowerCase();
      console.log(`Comando detectado: ${command}`);

      const commandProcessed = await processCommand(command);
      if (!commandProcessed) {
        speak("Comando no reconocido. Intenta nuevamente.");
      }

      const id = setTimeout(() => {
        recognition.stop();
        setTimeout(() => recognition.start(), 1000);
      }, 5000);

      setTimeoutId(id);
    };

    const processCommand = async (command) => {
      const isNavigationCommand = Object.keys(navigationCommands).find(cmd => command.includes(cmd));
      const isBackgroundCommand = Object.keys(backgroundImages).find(bg => command.includes(bg));
      const isColorCommand = Object.keys(colorDictionary).find(color => command.includes(color));

      if (isNavigationCommand) {
        const route = navigationCommands[isNavigationCommand];
        const pageName = isNavigationCommand.replace('ir a ', ''); // Extrae el nombre de la página
        onNavigate(route);
        speak(`Usted está navegando a ${pageName}`);
        return true;
      } else if (isBackgroundCommand) {
        const background = backgroundImages[isBackgroundCommand];
        onBackgroundChange({ backgroundImage: background, backgroundColor: 'transparent', backgroundSize: 'cover', backgroundPosition: 'center' });
        speak(`Fondo cambiado a ${isBackgroundCommand}`);
        return true;
      } else if (isColorCommand) {
        const colorInEnglish = colorDictionary[isColorCommand];
        onColorChange(colorInEnglish);
        speak(`Color cambiado a ${isColorCommand}`);
        return true;
      } else {
        const cohereResponse = await cohereHandleCommand(command);
        if (cohereResponse && !hasSpoken) {
          speak(cohereResponse);
          setHasSpoken(true);
          return true;
        } else if (!hasSpoken) {
          speak("Comando no reconocido. Intenta nuevamente.");
          setHasSpoken(true);
        }
      }
      return false;
    };

    const speak = (message) => {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        setHasSpoken(false);
      };
      window.speechSynthesis.speak(utterance);
    };

    recognition.onresult = handleRecognitionResult;
    recognition.onerror = (event) => {
      console.error('Error en el reconocimiento de voz:', event.error);
      restartRecognition();
    };

    const restartRecognition = () => {
      recognition.stop();
      setTimeout(() => recognition.start(), 3000);
    };

    if (isMicOn) {
      recognition.start();
    }

    return () => {
      recognition.stop();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isSpeaking, timeoutId, isMicOn]); // Añadido isMicOn a las dependencias

  const toggleMic = () => {
    setIsMicOn((prev) => !prev);
  };

  return (
    <div className="flex items-center cursor-pointer" onClick={toggleMic}>
      {isMicOn ? (
        <MdMic className='text-5xl text-green-500' />
      ) : (
        <MdMicOff className='text-5xl text-red-500' />
      )}
    </div>
  );
};

export default Microphone;
