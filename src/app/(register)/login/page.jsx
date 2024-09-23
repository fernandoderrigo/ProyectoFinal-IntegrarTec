'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEnvelope, FaLock, FaCheck, FaTimes } from 'react-icons/fa';
import Microphone from '@/components/common/navigation-bar/Microphone';
import RegisterLogin from '@/components/common/navigation-bar/LoginRegister';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');


    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          router.push('/prueba');
      } else {
        setError(data.error || 'Error logging in');
      } 
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Server error');
    }
  };
  return (
    <section className="relative flex flex-col items-center justify-start min-h-screen col-span-4 p-5 text-white">
      <RegisterLogin />

      <h1 className="z-10 mt-10 mb-5 text-3xl font-bold">Login</h1>

      <form className="z-10 w-full max-w-sm mt-5" onSubmit={handleLogin}>
        <label className="mb-4 flex items-center bg-gray-800 rounded-lg p-2.5 relative">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2.5 bg-transparent text-white text-lg outline-none border-none rounded-lg"
            required
          />
          <FaEnvelope className="absolute text-gray-400 right-2" />
        </label>
        <label className="mb-4 flex items-center bg-gray-800 rounded-lg p-2.5 relative">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2.5 bg-transparent text-white text-lg outline-none border-none rounded-lg"
            required
          />
          <FaLock className="absolute text-gray-400 right-2" />
        </label>

        {error && <p className="mb-4 text-red-500">{error}</p>}

        <section className="flex justify-between w-full max-w-sm mt-4 px-2.5 z-10">
          <button
            type="submit"
            className="flex-1 mr-2 p-2.5 bg-green-500 text-white rounded flex justify-center items-center cursor-pointer"
          >
            Accept <FaCheck className="ml-1.25" />
          </button>
          <button
            type="button"
            className="flex-1 ml-2 p-2.5 bg-red-600 text-white rounded flex justify-center items-center cursor-pointer"
            onClick={() => router.push('/')}
          >
            Cancel <FaTimes className="ml-1.25" />
          </button>
        </section>
      </form>

      <Microphone />

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
