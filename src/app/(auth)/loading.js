'use client';

import { motion } from 'framer-motion';

export default function AuthFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen col-span-4 bg-gradient-to-b from-blue-900 via-blue-800 to-black">
      <motion.div
        className="w-16 h-16 border-t-4 border-blue-500 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      <motion.h2
        className="mt-4 text-2xl font-semibold text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Cargando...
      </motion.h2>
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          />
        ))}
      </div>
    </div>
  );
}
