'use client';

import { CohereClient } from 'cohere-ai';

// Inicialización de Cohere
const cohere = new CohereClient({
  token: 'W331ncfqDOZmooKyMJNDqTmtwCFnq0idHV30tifS',
});

// Función para hablar la respuesta
const speakResponse = (response, setIsSpeaking) => {
  return new Promise((resolve) => {
    const utterance = new SpeechSynthesisUtterance(response);
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      resolve();
    };
    window.speechSynthesis.speak(utterance);
  });
};

// Manejo de comandos
export const handleCommand = async (command, setIsSpeaking) => {
  const cleanedCommand = command.toLowerCase().trim();
  
  const preamble = `
  Este chatbot de IA está diseñado para interpretar mensajes breves del usuario, que pueden variar entre 1 y 10 palabras o frases, como "en qué puedes ayudarme" o "qué puedes hacer por mí", y responder con un comando de voz según la intención del mensaje. Está diseñado para una aplicación de música 100% manejada por comandos de voz. Trata de hacer respuestas cortas y concisas, a menos que el usuario te pida lo contrario.
  
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
  `;

  try {
    const response = await cohere.chat({
      preamble: preamble,
      message: cleanedCommand,
    });

    if (response && response.text) {
      const aiResponse = response.text;
      await speakResponse(aiResponse, setIsSpeaking); // Pasa setIsSpeaking aquí
      return aiResponse;
    } else {
      throw new Error("La respuesta no contiene un texto válido.");
    }
  } catch (error) {
    const errorMessage = "Lo siento, no pude procesar tu solicitud. Intenta de nuevo más tarde.";
    await speakResponse(errorMessage, setIsSpeaking); // Pasa setIsSpeaking aquí
    return errorMessage;
  }
};
