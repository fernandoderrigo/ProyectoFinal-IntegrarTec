import axios from 'axios';

const REV_AI_API_KEY = '02H2jEqDCsG5WIRse1ShdnFT_MozajewkZ5mNs7fTO4lv1ZsiaqgyXX32srp1iLVGds-mr6htv-Eu8uG5ac70zeWuWAs4';
const REV_AI_API_URL = 'https://api.rev.ai/speechtotext/v1';

export const transcribeAudio = async (audioFile) => {
  const formData = new FormData();
  formData.append('file', audioFile);

  const response = await axios.post(`${REV_AI_API_URL}/jobs`, formData, {
    headers: {
      'Authorization': `Bearer ${REV_AI_API_KEY}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  const jobId = response.data.id;

  // Polling for job status and results
  let jobStatus = 'IN_PROGRESS';
  while (jobStatus === 'IN_PROGRESS') {
    const statusResponse = await axios.get(`${REV_AI_API_URL}/jobs/${jobId}`, {
      headers: {
        'Authorization': `Bearer ${REV_AI_API_KEY}`,
      },
    });
    jobStatus = statusResponse.data.status;
    if (jobStatus === 'IN_PROGRESS') {
      await new Promise(resolve => setTimeout(resolve, 5000)); // Espera 5 segundos antes de volver a consultar
    }
  }

  const resultResponse = await axios.get(`${REV_AI_API_URL}/jobs/${jobId}/transcript`, {
    headers: {
      'Authorization': `Bearer ${REV_AI_API_KEY}`,
    },
  });

  return resultResponse.data;
};
