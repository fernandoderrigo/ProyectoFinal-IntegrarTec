import { FaStepForward } from 'react-icons/fa';

export default function Forward({ audioRef, className }) {
  const handleForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10; // Forward 10 seconds
    }
  };

  return (
    <button onClick={handleForward} className={className}>
      <FaStepForward />
    </button>
  );
}
