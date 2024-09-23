import { FaStepBackward } from 'react-icons/fa';

export default function BackWard({ audioRef, className }) {
  const handleBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10; // Rewind 10 seconds
    }
  };

  return (
    <button onClick={handleBackward} className={className}>
      <FaStepBackward />
    </button>
  );
}
