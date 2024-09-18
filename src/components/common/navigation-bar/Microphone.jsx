'use client';

import React, { useEffect, useState } from 'react';
import nlp from 'compromise';
import { MdKeyboardVoice } from 'react-icons/md';

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
  
    useEffect(() => {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'es-ES';
      recognition.continuous = true;
      recognition.interimResults = false;
  
      const handleRecognitionResult = (event) => {
        if (isSpeaking) return; // Ignora comandos mientras se está hablando
        
        if (timeoutId) {
          clearTimeout(timeoutId);
          setTimeoutId(null);
        }
  
        const command = event.results[0][0].transcript.toLowerCase();
        console.log(`Comando detectado: ${command}`);
  
        if (!isListeningForCommand) {
          if (command === 'escucha') {
            setIsListeningForCommand(true);
            console.log('Palabra clave "escucha" detectada. Ahora escuchando comandos...');
            speak("¿Qué acción desea realizar?");
          }
        } else {
          if (command === 'escucha') {
            console.log('Palabra clave "escucha" detectada. Ya estamos escuchando comandos...');
            speak("¿Qué acción desea realizar?");
          } else {
            console.log('Escuchando comandos...');
            if (!processCommand(command)) {
              handleCommandError();
            } else {
              // Después de ejecutar un comando válido, vuelve a esperar "escucha"
              setIsListeningForCommand(false);
              console.log('Esperando nuevamente la palabra clave "escucha"...');
            }
          }
        }
  
        // Reinicia el temporizador de inactividad
        const id = setTimeout(() => {
          console.log('Reiniciando reconocimiento de voz por inactividad...');
          recognition.stop();
          setTimeout(() => recognition.start(), 1000); // Ajusta el retraso según tus necesidades
        }, 10000); // 10 segundos de inactividad
  
        setTimeoutId(id);
      };
  
      const handleRecognitionError = (event) => {
        console.error('Error en el reconocimiento de voz:', event.error);
        restartRecognition(); // Reinicia el reconocimiento en caso de error
      };
  
      const restartRecognition = () => {
        console.log('Reiniciando reconocimiento de voz...');
        recognition.stop();
        setTimeout(() => recognition.start(), 3000); // Ajusta el retraso según tus necesidades
      };
  
      const handleCommandError = () => {
        const utterance = new SpeechSynthesisUtterance("Comando no reconocido, intente nuevamente.");
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => {
          setIsSpeaking(false);
          // No es necesario reiniciar el reconocimiento aquí porque ya lo hacemos en el temporizador de inactividad
        };
        window.speechSynthesis.speak(utterance);
      };
  
      const processCommand = (command) => {
        const doc = nlp(command);
        const isNavigationCommand = Object.keys(navigationCommands).find(cmd => doc.has(cmd));
        const isBackgroundCommand = Object.keys(backgroundImages).find(bg => doc.has(bg));
        const isColorCommand = Object.keys(colorDictionary).find(color => doc.has(color));
  
        if (isNavigationCommand) {
          const route = navigationCommands[isNavigationCommand];
          console.log(`Navegando a la ruta: ${route}`);
          onNavigate(route);
          speak(`Usted está navegando a ${isNavigationCommand}`);
          return true; // Comando reconocido y procesado
        } else if (isBackgroundCommand) {
          const background = backgroundImages[isBackgroundCommand];
          console.log(`Cambiando fondo a: ${isBackgroundCommand}`);
          onBackgroundChange({ backgroundImage: background, backgroundColor: 'transparent' });
          speak(`Fondo cambiado a ${isBackgroundCommand}`);
          return true; // Comando reconocido y procesado
        } else if (isColorCommand) {
          const colorInEnglish = colorDictionary[isColorCommand];
          console.log(`Cambiando color a: ${colorInEnglish}`);
          if (typeof onColorChange === 'function') {
            onColorChange(colorInEnglish);
            speak(`Color cambiado a ${isColorCommand}`);
            return true; // Comando reconocido y procesado
          }
        }
  
        // Si llegamos aquí, el comando no fue reconocido
        return false;
      };
  
      const speak = (message) => {
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => {
          setIsSpeaking(false);
          // No reinicia el reconocimiento aquí porque ya lo hacemos después de un comando inválido
        };
        window.speechSynthesis.speak(utterance);
      };
  
      recognition.onresult = handleRecognitionResult;
      recognition.onerror = handleRecognitionError;
  
      recognition.start();
      console.log('Iniciando reconocimiento de voz...');
  
      return () => {
        recognition.stop();
        console.log('Reconocimiento de voz detenido.');
        if (timeoutId) clearTimeout(timeoutId);
      };
    }, [isListeningForCommand, isSpeaking, timeoutId]);
  
    return <MdKeyboardVoice className='text-5xl'/>;
  };
  
export default Microphone;
