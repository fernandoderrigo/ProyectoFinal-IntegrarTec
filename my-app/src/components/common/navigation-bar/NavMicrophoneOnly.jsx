import { MdKeyboardVoice } from 'react-icons/md';

export default function NavMicrophoneOnly() {
  return (
    <nav className="w-full">
      <ul className="grid w-full grid-cols-5 gap-4 px-4 pb-1 pt-7 bg-gradient-to-t from-indigo-500 to-transparent">
        <li className="flex items-center justify-center col-start-3">
          <button>
            <MdKeyboardVoice className="text-5xl " />
          </button>
        </li>
      </ul>
    </nav>
  );
}
