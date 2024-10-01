'use client';

import { useRouter } from 'next/navigation';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';

export default function HomePage() {
  const router = useRouter();

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen p-5 text-neutralViolet-900">
      <h1 className="z-10 mb-5 text-3xl font-bold text-neutral-100">EscuchaFacil</h1>
      <p className="z-10 mb-10 text-lg text-center text-neutral-100">
        Una aplicación de música revolucionaria diseñada para que puedas disfrutarla con comandos de voz.
      </p>

      <section className="flex justify-center w-full max-w-sm z-10">
        <button
          className="flex-1 mr-2 p-2.5 bg-blue-400 text-white rounded flex justify-center items-center cursor-pointer hover:bg-violet-300 transition"
          onClick={() => router.push('/login')}
        >
          Login <FaSignInAlt className="ml-1.25" />
        </button>
        <button
          className="flex-1 ml-2 p-2.5 bg-blue-400 text-white rounded flex justify-center items-center cursor-pointer hover:bg-violet-300 transition"
          onClick={() => router.push('/register')}
        >
          Register <FaUserPlus className="ml-1.25" />
        </button>
      </section>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="relative w-full h-full bg-gradient-to-b from-blue-900 via-blue-800 to-black">
          {Array(50)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="star"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              ></div>
            ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 1;
          }
        }
        .star {
          width: 2px;
          height: 2px;
          background-color: white;
          border-radius: 50%;
          position: absolute;
          animation: twinkle 2s infinite;
        }
        .star:nth-child(odd) {
          animation-duration: 3s;
        }
        .star:nth-child(even) {
          animation-duration: 1.5s;
        }
      `}</style>
    </section>
  );
}
