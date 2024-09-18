import { useState } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

const Play = ({ audioRef, classIcon }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button onClick={togglePlayPause}>
      {isPlaying ? <FaPause className={classIcon} /> : <FaPlay className={classIcon} />}
    </button>
  );
};

export default Play;
