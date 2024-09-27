import { useMicrophoneContext } from '@/contexts/MicrophoneContext';

export default function useMicrophone() {
  const { isListening, startListening, stopListening } = useMicrophoneContext();
  return { isListening, startListening, stopListening };
}
