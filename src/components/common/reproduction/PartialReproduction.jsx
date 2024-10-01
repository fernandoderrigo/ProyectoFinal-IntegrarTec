'use client';

import { useContext, useEffect, useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Play from './button/Play';
import AddSong from './button/Add';
import { SongContext } from '@/contexts/AudioContext';
import { tokenExpired } from '@/utils/jwtDecode';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'; // Asegúrate de instalar react-icons

function PartialReproductionFallback() {
  return (
    <motion.section
      initial={{ opacity: 0.9 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-[3fr_1fr] md:grid-cols-[6fr_1fr] lg:grid-cols-[5fr_1fr] bg-violet-800 p-2 md:p-4 lg:p-6 shadow-lg animate-pulse"
    >
      <div className="grid grid-cols-3 col-start-1 gap-4 text-left">
        <div className="w-full col-start-1 overflow-hidden aspect-square rounded-xl bg-violet-700" />
        <div className="col-span-2 col-start-2 space-y-2">
          <div className="w-3/4 h-6 rounded bg-violet-700" />
          <div className="w-1/2 h-4 rounded bg-violet-700" />
          <div className="w-1/4 h-4 rounded bg-violet-700" />
        </div>
      </div>
      <div className="grid content-center grid-cols-2 px-4">
        <div className="w-8 h-8 rounded-full md:w-10 md:h-10 lg:w-12 lg:h-12 bg-violet-700" />
      </div>
    </motion.section>
  );
}

export default function PartialReproduction({ showFullReproduction, audioRef }) {
  const { selectedSong, setSelectedSong } = useContext(SongContext);
  const [history, setHistory] = useState([]);
  const hasRun = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [isVisible, setIsVisible] = useState(true); // Estado para la visibilidad de la barra

  useEffect(() => {
    const token = tokenExpired();
    setToken(token);
  }, []);

  useEffect(() => {
    if (!token) return;
    async function fetchHistory() {
      try {
        let response = await fetch('/api/history', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          const lastHistorySong = data.slice(0, 1);
          setHistory(lastHistorySong);
        } else {
          console.error('Error al obtener las canciones');
        }
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchHistory();
  }, [setHistory, token]);

  const lastHistorySong = history
    .map(({ songs }) => songs)
    .map(({ id, name, duration, gender, image_Url, audio_Url, artists }) => {
      return {
        id,
        name,
        duration,
        gender,
        imageUrl: image_Url,
        audioUrl: audio_Url,
        artists,
      };
    });

  useEffect(() => {
    if (!hasRun.current && lastHistorySong.length > 0) {
      setSelectedSong(lastHistorySong[0]);
      hasRun.current = true;
    }
  }, [lastHistorySong, setSelectedSong]);

  const defaultSong = useMemo(() => {
    if (history.length > 0) {
      const song = lastHistorySong[0];
      return song;
    }
    return {
      id: null,
      imageUrl: '/img/gatito.webp',
      gender: 'Music',
      name: 'No song selected',
      artists: 'Select a song to play',
      duration: '--:--',
      audioUrl: '',
    };
  }, [history, lastHistorySong]);

  const infoSong = selectedSong || defaultSong;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  if (isLoading) {
    return <PartialReproductionFallback />;
  }

  return (
    <AnimatePresence>
      {isVisible && ( // Renderizar solo si isVisible es true
        <motion.section
          className="grid grid-cols-[3fr_1fr] md:grid-cols-[4fr_1fr] lg:grid-cols-[5fr_1fr] bg-violet-800 p-2 md:p-4 lg:p-6 shadow-lg max-w-screen-lg mx-auto relative"
          style={{ viewTransitionName: 'reproduction-container' }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.button
            className="grid grid-cols-3 col-start-1 gap-4 text-left"
            onClick={showFullReproduction}
            variants={itemVariants}
          >
            <motion.picture
              className="w-full col-start-1 overflow-hidden aspect-square rounded-xl"
              style={{ viewTransitionName: 'song-image' }}
              variants={itemVariants}
            >
              <img
                src={infoSong.imageUrl}
                alt={infoSong.gender}
                className="object-cover w-full h-full"
              />
            </motion.picture>
            <motion.section
              className="col-span-2 col-start-2 space-y-2"
              variants={itemVariants}
            >
              <motion.h2
                className="text-sm font-semibold text-neutralViolet-50 md:text-base lg:text-lg"
                style={{ viewTransitionName: 'song-name' }}
                variants={itemVariants}
              >
                {infoSong.name}
              </motion.h2>
              <motion.p
                className="text-xs md:text-sm lg:text-base text-neutralViolet-200"
                style={{ viewTransitionName: 'song-artist' }}
                variants={itemVariants}
              >
                {infoSong.artists}
              </motion.p>
              <motion.p
                className="text-xs md:text-sm lg:text-base text-neutralViolet-300"
                variants={itemVariants}
              >
                {infoSong.duration}
              </motion.p>
            </motion.section>
          </motion.button>
          <motion.section
            className="grid content-center grid-cols-2 px-4"
            variants={itemVariants}
          >
            <audio ref={audioRef} src={infoSong.audioUrl}></audio>
            <Play
              audioRef={audioRef}
              className="text-sm text-neutralViolet-50 hover:text-neutralViolet-200 md:text-base lg:text-lg"
            />
            <AddSong className="text-sm text-neutralViolet-50 hover:text-neutralViolet-200 md:text-base lg:text-lg" />
          </motion.section>
          <button 
            onClick={() => setIsVisible(!isVisible)} // Cambia la visibilidad al hacer clic
            className="absolute bg-transparent top-2 right-2 text-neutralViolet-50"
          >
            {isVisible ? (
              <FaChevronUp size={24} /> // Flecha hacia arriba
            ) : (
              <FaChevronDown size={24} /> // Flecha hacia abajo
            )}
          </button>
        </motion.section>
      )}
      {!isVisible && ( // Mostrar un botón para volver a mostrar la barra
        <button 
          onClick={() => setIsVisible(true)} // Mostrar la barra
          className="fixed p-2 rounded-full shadow-lg bottom-16 right-4 text-neutralViolet-50 bg-violet-700 xl:bottom-4"
        >
          <FaChevronDown size={24} /> {/* Flecha hacia abajo para mostrar la barra */}
        </button>
      )}
    </AnimatePresence>
  );
}
