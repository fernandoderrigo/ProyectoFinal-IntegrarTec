
HOY
16:52
Tigito
16:53
ya traje los datos ahora hago el merge
16:53
Gatito bonito
16:54
Hoy reunión
16:54
Acordate
16:54
🥲
17:03
(?
17:04
No consigo traer bien tus cambios
17:16
No me salen las cosas de head y eso
17:16
????
17:17
No sé
17:25
Me trajo tus cambios pero directamente dónde había cambios tomo lo mío y no lo tuyo
17:25
ª
17:27
Vas a discord??
17:31
Para?
17:32
Toy baño
17:32
Ver si los cambios están bien?
17:32
Jijiji
17:32
Termino y voy
17:32
Voy
17:47
import { CohereClient } from 'cohere-ai';

// Inicialización de Cohere
const cohere = new CohereClient({
  token: 'W331ncfqDOZmooKyMJNDqTmtwCFnq0idHV30tifS',
});

// Manejo de comandos
export const handleCommand = async (command) => {
  const cleanedCommand = command.toLowerCase().trim();
  
  const preamble = `
  Bienvenido a EscuchaFacil, una innovadora aplicación de música donde puedes realizar todas tus acciones mediante comandos de voz. Este chatbot de IA está diseñado para interpretar mensajes breves de los usuarios, que pueden variar entre 1 y 10 palabras o frases, como "¿qué puedes hacer por mí?" o "reproduce mi playlist favorita". 

  Nuestras respuestas son concisas, con un máximo de 10 palabras, y si deseas que cante una canción, ¡también puedo hacerlo! 

  Este proyecto es una colaboración de Fer, Nahu, Seba y Mati, desarrollado como parte de IntegrarTec. Disfruta de la experiencia musical sin límites con EscuchaFacil.

  Comandos de navegación disponibles:
  - login
  - registro
  - inicio
  - perfil
  - creaciones
  - playlist
  - buscar
  - editar perfil
  - configuracion
  - historial
  
  Fondos disponibles:
  - agua
  - brillo
  - AO
  - burbuja
  - chica
  - chico
  - comida
  - estrella
  - chill
  - anime
  - futuro
  - gamer
  - halloween
  - kirby
  - lago
  - lluvia
  - mario
  - ojo
  - otaku
  - computadora
  - playa
  - estrella
  - totoro

  Puedes usar estos comandos para navegar por la aplicación o cambiar el fondo de pantalla.
  Tambien el usuario te puede pedir que hables como un personaje ficticio (batman, superman, goku, naruto,etc) o como una figura publica (Messi,Susana Gimenez, etc).
  `;

  try {
    const response = await cohere.chat({
      preamble: preamble,
      message: cleanedCommand,
    });

    if (response && response.text) {
      return response.text;
    } else {
      throw new Error("La respuesta no contiene un texto válido.");
    }
  } catch (error) {
    const errorMessage = "Lo siento, no pude procesar tu solicitud. Intenta de nuevo más tarde.";
    return errorMessage;
  }
};

export default cohere;
18:16
adsasdsad
18:17
escuchafacil.s3.us-east-2.amazonaws.com
https://escuchafacil.s3.us-east-2.amazonaws.com/agua.webp
escuchafacil.s3.us-east-2.amazonaws.com
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
      console.log(Comando detectado: ${command});

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
        speak(Usted está navegando a ${isNavigationCommand});
        return true;
      } else if (isBackgroundCommand) {
        const background = backgroundImages[isBackgroundCommand];
        onBackgroundChange({ backgroundImage: background, backgroundColor: 'transparent' });
        speak(Fondo cambiado a ${isBackgroundCommand});
        return true;
      } else if (isColorCommand) {
        const colorInEnglish = colorDictionary[isColorCommand];
        onColorChange(colorInEnglish);
        speak(Color cambiado a ${isColorCommand});
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
        speak(Comando no reconocido, ¿quisiste decir ${suggestion}?);
      } else {
        speak("Comando no reconocido, intenta nuevamente.");
      }
    };

    const speak = (message) => {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        // Reinicia el estado después de hablar
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
  }, [isListeningForCommand, isSpeaking, timeoutId]);

  return <MdKeyboardVoice className='text-5xl' />;
};

export default Microphone;
18:17


