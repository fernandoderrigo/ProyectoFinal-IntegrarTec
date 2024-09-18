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
  'inicio': '/',
  'perfil': '/profile',
  'creaciones': '/my-creations',
  'playlist': '/my-playlists',
  'buscar': '/search',
  'editar perfil': '/profile/edit',
  'configuracion': '/profile/user-setting',
  'historial': '/profile/history',
};

const backgroundImages = {
  'agua': 'url("")',
  'brillo': 'url("")',
  'AO': 'url("")',
  'burbuja': 'url("")',
  'chica': 'url("")',
  'chico': 'url("")',
  'comida': 'url("")',
  'estrella': 'url("")',
  'chill': 'url("")',
  'anime': 'url("")',
  'futuro': 'url("")',
  'gamer': 'url("")',
  'halloween': 'url("")',
  'kirby': 'url("")',
  'lago': 'url("")',
  'lluvia': 'url("")',
  'mario': 'url("")',
  'ojo': 'url("")',
  'otaku': 'url("")',
  'computadora': 'url("")',
  'playa': 'url("")',
  'estrella': 'url("")',
  'totoro': 'url("")',

};

const Microphone = ({ onNavigate, onColorChange, onBackgroundChange }) => {
    const [isListeningForCommand, setIsListeningForCommand] = useState(false);
    const [isRestarting, setIsRestarting] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
  
    useEffect(() => {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'es-ES';
      recognition.continuous = true;
      recognition.interimResults = false;
  
      const handleRecognitionResult = (event) => {
        if (isSpeaking) return; // Ignora comandos mientras se está hablando
  
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
            }
            // Después de ejecutar el comando, vuelve a esperar "escucha"
            setIsListeningForCommand(false);
            console.log('Esperando nuevamente la palabra clave "escucha"...');
          }
        }
      };
  
      const handleRecognitionError = (event) => {
        console.error('Error en el reconocimiento de voz:', event.error);
        restartRecognition(); // Reinicia el reconocimiento en caso de error
      };
  
      const restartRecognition = () => {
        if (!isRestarting) {
          setIsRestarting(true);
          console.log('Reiniciando reconocimiento de voz...');
          recognition.stop();
          setTimeout(() => {
            recognition.start();
            setIsRestarting(false);
          }, 3000); // Ajusta el retraso según tus necesidades
        }
      };
  
      const handleCommandError = () => {
        const utterance = new SpeechSynthesisUtterance("Comando no reconocido, intente nuevamente.");
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => {
          setIsSpeaking(false);
          // Reinicia el reconocimiento después de hablar
          restartRecognition();
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
          // Reinicia el reconocimiento después de hablar
          restartRecognition();
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
      };
    }, [isListeningForCommand, isRestarting, isSpeaking]);
  
    return <MdKeyboardVoice className='text-5xl'/>;
  };
  
  export default Microphone;