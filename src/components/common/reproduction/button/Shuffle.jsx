import { useState } from 'react';
import { FaRandom } from 'react-icons/fa';

export default function Shuffle({ className, onShuffle }) {
  const [isShuffled, setIsShuffled] = useState(false);

  const handleShuffle = () => {
    setIsShuffled(!isShuffled);
    if (onShuffle) {
      onShuffle(!isShuffled);
    }
  };

  return (
    <button
      onClick={handleShuffle}
      className={`${className} ${isShuffled ? 'text-violet-400' : ''}`}
    >
      <FaRandom />
    </button>
  );
}
