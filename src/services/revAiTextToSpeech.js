import axios from 'axios';

const REV_AI_API_KEY = '02H2jEqDCsG5WIRse1ShdnFT_MozajewkZ5mNs7fTO4lv1ZsiaqgyXX32srp1iLVGds-mr6htv-Eu8uG5ac70zeWuWAs4';
const REV_AI_API_URL = 'https://api.rev.ai/texttospeech/v1'; // Verifica la URL en la documentación

export const synthesizeSpeech = async (text) => {
  const response = await axios.post(`${REV_AI_API_URL}/synthesize`, {
    text,
    voice: 'en_us_male' // Ajusta según la voz que prefieras
  }, {
    headers: {
      'Authorization': `Bearer ${REV_AI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    responseType: 'arraybuffer', // Si la API devuelve un archivo de audio
  });

  const audioBlob = new Blob([response.data], { type: 'audio/wav' });
  const audioUrl = URL.createObjectURL(audioBlob);

  const audio = new Audio(audioUrl);
  audio.play();
};
