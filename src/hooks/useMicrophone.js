
import { useState, useEffect } from 'react';

export default function useMicrophone() {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (isListening) {
      // Lógica para iniciar el reconocimiento de voz
      console.log('Micrófono activado');
    } else {
      // Lógica para detener el reconocimiento de voz
      console.log('Micrófono desactivado');
    }


    return () => {
      if (isListening) {
        console.log('Micrófono detenido');
      }
    };
  }, [isListening]);

  const startListening = () => {
    setIsListening(true);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  return { isListening, startListening, stopListening };
}
