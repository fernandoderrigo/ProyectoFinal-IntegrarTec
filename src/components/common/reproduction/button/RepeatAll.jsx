import { useState } from 'react';
import { LuRepeat } from 'react-icons/lu';

export default function RepeatAll({ audioRef, className }) {
  const [isRepeat, setIsRepeat] = useState(false);

  const toggleRepeat = () => {
    if (audioRef.current) {
      audioRef.current.loop = !isRepeat;
      setIsRepeat(!isRepeat);
    }
  };

  return (
    <button
      onClick={toggleRepeat}
      className={`${className} ${isRepeat ? 'text-violet-400' : ''}`}
    >
      <LuRepeat />
    </button>
  );
}
