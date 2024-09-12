'use client';

import React, { useEffect } from 'react';

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
    useEffect(() => {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'es-ES';
      recognition.continuous = false;
      recognition.interimResults = false;
  
      recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        console.log('Comando detectado:', command);
  
        if (command in navigationCommands) {
          const route = navigationCommands[command];
          onNavigate(route);
        } else if (command in backgroundImages) {
          const background = backgroundImages[command];
          onBackgroundChange({ backgroundImage: background, backgroundColor: 'transparent' });
        } else {
          const colorInEnglish = colorDictionary[command];
          if (colorInEnglish) {
            if (typeof onColorChange === 'function') {
              onColorChange(colorInEnglish);
            } else {
              console.error('onColorChange no está definido o no es una función');
            }
          } else {
            console.log('Comando no reconocido:', command);
          }
        }
      };
  
      recognition.onerror = (event) => {
        console.error('Error en el reconocimiento de voz:', event.error);
      };
  
      document.body.onclick = () => {
        recognition.start();
      };
    }, [onNavigate, onColorChange, onBackgroundChange]);
  
    return null;
  };
  
  export default Microphone;