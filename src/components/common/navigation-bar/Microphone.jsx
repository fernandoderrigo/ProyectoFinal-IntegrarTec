'use client';

import React, { useEffect, useState } from 'react';

const colorDictionary = {
    'aqua': 'aqua',
    'azul': 'blue',
    'beige': 'beige',
    'bisque': 'bisque',
    'negro': 'black',
    'marrón': 'brown',
    'chocolate': 'chocolate',
    'coral': 'coral',
    'carmesí': 'crimson',
    'cian': 'cyan',
    'fucsia': 'fuchsia',
    'blanco fantasmal': 'ghostwhite',
    'dorado': 'gold',
    'dorado oscuro': 'goldenrod',
    'gris': 'gray',
    'verde': 'green',
    'índigo': 'indigo',
    'marfil': 'ivory',
    'caqui': 'khaki',
    'lavanda': 'lavender',
    'lima': 'lime',
    'lino': 'linen',
    'magenta': 'magenta',
    'granate': 'maroon',
    'mocasín': 'moccasin',
    'navy': 'navy',
    'oliva': 'olive',
    'naranja': 'orange',
    'orquídea': 'orchid',
    'peru': 'peru',
    'rosa': 'pink',
    'ciruela': 'plum',
    'púrpura': 'purple',
    'rojo': 'red',
    'salmón': 'salmon',
    'siena': 'sienna',
    'plata': 'silver',
    'nieve': 'snow',
    'arena': 'tan',
    'verde azulado': 'teal',
    'cardo': 'thistle',
    'tomate': 'tomato',
    'turquesa': 'turquoise',
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
    'tranqui': 'url("/img/fondo1.webp")',
    'anime': 'url("/img/fondo2.webp")',
    'retro': 'url("/img/fondo3.jpg")',
    'haru': 'url("/img/fondo4.jpg")',
    'lluvia': 'url("/img/lluvia.gif")',
    'mario': 'url("/img/mario.gif")',
    'computadora': 'url("/img/pc.gif")',
    'tigrito': 'url("/img/tigrito.gif")',


};

const Microphone = ({ onNavigate, onColorChange, onBackgroundChange }) => {
  const [isListeningForCommand, setIsListeningForCommand] = useState(false);

  useEffect(() => {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'es-ES';
      recognition.continuous = true; // Hacemos que el reconocimiento sea continuo
      recognition.interimResults = false;

      recognition.onresult = (event) => {
          const command = event.results[0][0].transcript.toLowerCase();
          console.log('Comando detectado:', command);

          if (!isListeningForCommand) {
              console.log('Esperando el comando "hola"...');
              if (command === 'hola') {
                  console.log('Palabra de activación "hola" detectada. Ahora escuchando comandos...');
                  setIsListeningForCommand(true); // Activa el modo de comandos
              }
          } else {
              console.log('Escuchando comandos...');
              if (command in navigationCommands) {
                  const route = navigationCommands[command];
                  console.log(`Navegando a la ruta: ${route}`);
                  onNavigate(route);
              } else if (command in backgroundImages) {
                  const background = backgroundImages[command];
                  console.log(`Cambiando fondo a: ${command}`);
                  onBackgroundChange({ backgroundImage: background, backgroundColor: 'transparent' });
              } else {
                  const colorInEnglish = colorDictionary[command];
                  if (colorInEnglish) {
                      console.log(`Cambiando color a: ${colorInEnglish}`);
                      if (typeof onColorChange === 'function') {
                          onColorChange(colorInEnglish);
                      } else {
                          console.error('onColorChange no está definido o no es una función');
                      }
                  } else {
                      console.log('Comando no reconocido:', command);
                  }
              }

              // Después de ejecutar el comando, vuelve a esperar "hola"
              setIsListeningForCommand(false);
              console.log('Esperando nuevamente el comando "hola"...');
          }
      };

      recognition.onerror = (event) => {
          console.error('Error en el reconocimiento de voz:', event.error);
      };

      recognition.start();
      console.log('Iniciando reconocimiento de voz...');

      return () => {
          recognition.stop();
          console.log('Reconocimiento de voz detenido.');
      };
  }, [isListeningForCommand, onNavigate, onColorChange, onBackgroundChange]);

  return null;
};

export default Microphone;