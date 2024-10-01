'use client';

import React, { useEffect, useState } from 'react';
import { MdKeyboardVoice } from 'react-icons/md';
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
  'login': '/login',
  'registro': '/register',
  'inicio': '/home',
  'perfil': '/profile',
  'creaciones': '/my-creations',
  'playlist': '/my-playlists',
  'buscar': '/search',
  'editar perfil': '/profile/edit',
  'configuracion': '/profile/user-setting',
  'historial': '/profile/history',
};

const backgroundImages = {
  'agua': 'url("https://escuchafacil.s3.us-east-2.amazonaws.com/agua.webp")',
  'brillo': 'url("https://escuchafacil.s3.us-east-2.amazonaws.com/aguita.gif")',
  'AO': 'url("https://escuchafacil.s3.us-east-2.amazonaws.com/ao.gif")',
  'burbuja': 'url("https://escuchafacil.s3.us-east-2.amazonaws.com/burbuja.gif")',
  'chica': 'url("https://escuchafacil.s3.us-east-2.amazonaws.com/chica.gif")',
  'chico': 'url("https://escuchafacil.s3.us-east-2.amazonaws.com/chico.gif")',
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
  'ojo': 'url("https://escuchafacil.s3.us-east-2.amazonaws.com/ojo.gif")',
  'otaku': 'url("https://escuchafacil.s3.us-east-2.amazonaws.com/otaku.gif")',
  'computadora': 'url("https://escuchafacil.s3.us-east-2.amazonaws.com/pc.gif")',
  'playa': 'url("https://escuchafacil.s3.us-east-2.amazonaws.com/playa_anime.gif")',
  'estrella': 'url("https://escuchafacil.s3.us-east-2.amazonaws.com/star.gif")',
  'totoro': 'url("https://escuchafacil.s3.us-east-2.amazonaws.com/totoro.gif")',
};

const Microphone = ({ onNavigate, onColorChange, onBackgroundChange }) => {
  const [isListeningForCommand, setIsListeningForCommand] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [hasSpoken, setHasSpoken] = useState(false);
  const [errorCount, setErrorCount] = useState(0); // Contador de errores

  useEffect(() => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.continuous = true;
    recognition.interimResults = false;

    const handleRecognitionResult = async (event) => {
      if (isSpeaking) return;

      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }

      const command = event.results[0][0].transcript.toLowerCase();
      console.log(`Comando detectado: ${command}`);

      if (!isListeningForCommand) {
        if (command === 'escucha') {
          setIsListeningForCommand(true);
          speak("¿Qué acción desea realizar?");
          setHasSpoken(false);
        }
      } else {
        if (command === 'escucha') {
          speak("¿Qué acción desea realizar?");
        } else {
          const commandProcessed = await processCommand(command);
          if (!commandProcessed) {
            handleCommandError(command);
          } else {
            setIsListeningForCommand(false);
          }
        }
      }

      const id = setTimeout(() => {
        recognition.stop();
        setTimeout(() => recognition.start(), 1000);
      }, 10000);

      setTimeoutId(id);
    };

    const processCommand = async (command) => {
      const isNavigationCommand = Object.keys(navigationCommands).find(cmd => command.includes(cmd));
      const isBackgroundCommand = Object.keys(backgroundImages).find(bg => command.includes(bg));
      const isColorCommand = Object.keys(colorDictionary).find(color => command.includes(color));

      if (isNavigationCommand) {
        const route = navigationCommands[isNavigationCommand];
        onNavigate(route);
        speak(`Usted está navegando a ${isNavigationCommand}`);
        return true;
      } else if (isBackgroundCommand) {
        const background = backgroundImages[isBackgroundCommand];
        onBackgroundChange({ backgroundImage: background, backgroundColor: 'transparent' });
        speak(`Fondo cambiado a ${isBackgroundCommand}`);
        return true;
      } else if (isColorCommand) {
        const colorInEnglish = colorDictionary[isColorCommand];
        onColorChange(colorInEnglish);
        speak(`Color cambiado a ${isColorCommand}`);
        return true;
      } else {
        // Procesar respuesta de Cohere solo si no se ha hablado anteriormente
        const cohereResponse = await cohereHandleCommand(command);
        if (cohereResponse && !hasSpoken) {
          speak(cohereResponse);
          setHasSpoken(true);
          return true; // Indica que se procesó un comando
        } else if (!hasSpoken) {
          speak("Comando no reconocido. Intenta nuevamente.");
          setHasSpoken(true);
        }
      }
      return false;
    };

    const handleCommandError = async (command) => {
      const suggestion = await cohereHandleCommand(command);
      if (suggestion) {
        speak(`Comando no reconocido, ¿quisiste decir ${suggestion}?`);
      } else {
        setErrorCount(prev => {
          const newCount = prev + 1; // Incrementar el contador de errores
          if (newCount >= 10) {
            window.location.reload(); // Recargar la página después de 10 errores
          }
          return newCount;
        });
        speak("Comando no reconocido, intenta nuevamente.");
      }
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

    recognition.start();

    return () => {
      recognition.stop();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isListeningForCommand, onBackgroundChange,onColorChange, onNavigate, hasSpoken, isSpeaking, timeoutId]);

  return <MdKeyboardVoice className='text-5xl' />;
};

export default Microphone;
