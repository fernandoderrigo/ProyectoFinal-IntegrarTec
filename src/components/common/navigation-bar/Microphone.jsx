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
            setIsListeningForCommand(false);
            console.log('Esperando nuevamente la palabra clave "escucha"...');
          }
        }
      }

      const id = setTimeout(() => {
        console.log('Reiniciando reconocimiento de voz por inactividad...');
        recognition.stop();
        setTimeout(() => recognition.start(), 1000);
      }, 10000);

      setTimeoutId(id);
    };

    const handleRecognitionError = (event) => {
      console.error('Error en el reconocimiento de voz:', event.error);
      restartRecognition();
    };

    const restartRecognition = () => {
      console.log('Reiniciando reconocimiento de voz...');
      recognition.stop();
      setTimeout(() => recognition.start(), 3000);
    };

    const handleCommandError = () => {
      const utterance = new SpeechSynthesisUtterance("Comando no reconocido, intente nuevamente.");
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    };

    const processCommand = (command) => {
      const doc = nlp(command);
      const isNavigationCommand = Object.keys(navigationCommands).find(cmd => doc.has(cmd));
      const isBackgroundCommand = Object.keys(backgroundImages).find(bg => doc.has(bg));
      const isColorCommand = Object.keys(colorDictionary).find(color => doc.has(color));

      // Comando especial para "Marolio"
      if (doc.has('marolio')) {
        console.log('Cantando la canción de Marolio...');
        speakMarolioSong();
        return true;
      }

      // Comando especial para "lectura" (lee el contenido de la pantalla)
      if (doc.has('lectura')) {
        console.log('Leyendo el contenido de la pantalla...');
        speakScreenContent();
        return true;
      }

      if (isNavigationCommand) {
        const route = navigationCommands[isNavigationCommand];
        console.log(`Navegando a la ruta: ${route}`);
        onNavigate(route);
        speak(`Usted está navegando a ${isNavigationCommand}`);
        return true;
      } else if (isBackgroundCommand) {
        const background = backgroundImages[isBackgroundCommand];
        console.log(`Cambiando fondo a: ${isBackgroundCommand}`);
        onBackgroundChange({ backgroundImage: background, backgroundColor: 'transparent' });
        speak(`Fondo cambiado a ${isBackgroundCommand}`);
        return true;
      } else if (isColorCommand) {
        const colorInEnglish = colorDictionary[isColorCommand];
        console.log(`Cambiando color a: ${colorInEnglish}`);
        if (typeof onColorChange === 'function') {
          onColorChange(colorInEnglish);
          speak(`Color cambiado a ${isColorCommand}`);
          return true;
        }
      }

      return false;
    };

    const speak = (message) => {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    };

    const speakMarolioSong = () => {
      const marolioLyrics = `
        Marolio le da sabor a tu vida
        Marolio está desde el comienzo del día
        Manteca, te, café, harina y palmitos
        Yerba, mermeladas, cacao, picadillo
        Pasta, arvejas, atún, sardinas y caballa
        Arroz y yerba mate, harina y lentejas...
      `;
      const utterance = new SpeechSynthesisUtterance(marolioLyrics);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    };

    const speakScreenContent = () => {
      const bodyText = document.body.innerText;
      const utterance = new SpeechSynthesisUtterance(bodyText);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    };

    recognition.onresult = handleRecognitionResult;
    recognition.onerror = handleRecognitionError;

    recognition.start();

    return () => recognition.stop();
  }, [isListeningForCommand, isSpeaking, timeoutId, onNavigate, onColorChange, onBackgroundChange]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <MdKeyboardVoice size={48} />
    </div>
  );
};

export default Microphone;