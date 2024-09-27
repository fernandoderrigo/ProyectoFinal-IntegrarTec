'use client';
import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';

import Options from '../button/Options';
import { SongContext } from '@/contexts/AudioContext';
import { SongListFallback } from '@/components/fallback/SongListFallback';

export default function SongList({ filterFunction, order = [] }) {
  const [songList, setSongList] = useState([]);
  const [loading, setLoading] = useState(true);

  const { setSelectedSong } = useContext(SongContext);

  const handleClick = async (song) => {
    setSelectedSong(song);
    await createUserHistory(song.id);
  };

  // Función para crear el historial del usuario
  const createUserHistory = async (songId) => {
    const accessToken = localStorage.getItem('accessToken');
    const RefreshAccessToken = localStorage.getItem('refreshToken');

    try {
      let response = await fetch('/api/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          id: songId,
        }),
      });
      if (response.status === 401 && RefreshAccessToken) {
        console.log('intento con refresToken');
        response = await fetch('/api/history', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${RefreshAccessToken}`,
          },
          body: JSON.stringify({
            id: songId,
          }),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al crear historial');
      }

      const userHistory = await response.json();
      console.log('User history created:', userHistory);
    } catch (error) {
      console.error('Error creating user history:', error);
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const RefreshAccessToken = localStorage.getItem('refreshToken');

    async function fetchSongsData() {
      try {
        let response = await fetch('/api/filter', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.status === 401 && RefreshAccessToken) {
          console.log('intento con refresToken');
          response = await fetch('/api/filter', {
            headers: {
              Authorization: `Bearer ${RefreshAccessToken}`,
            },
          });
        }

        if (response.ok) {
          const data = await response.json();
          setSongList(data);
        } else {
          console.error('Error al obtener las canciones');
        }
      } catch (error) {
        console.error('Error fetching songs:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchSongsData();
  }, []);

  if (loading) {
    return <SongListFallback />;
  }

  const filteredSongs = songList
    .filter(filterFunction)
    .sort((a, b) =>
      order.length > 0 ? order.indexOf(a.id) - order.indexOf(b.id) : 0
    );

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.article
      className="col-span-4 px-4"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {filteredSongs.map(
        ({ id, name, duration, gender, imageUrl, audioUrl, artists }) => (
          <motion.section
            key={id}
            className="grid grid-cols-4 gap-4 px-4 py-5 my-4 bg-neutralViolet-900/40 rounded-xl"
            variants={item}
          >
            <button
              className="grid grid-cols-3 col-span-3 col-start-1 gap-4"
              onClick={() =>
                handleClick({
                  id,
                  name,
                  duration,
                  gender,
                  imageUrl,
                  audioUrl,
                  artists,
                })
              }
            >
              <picture className="w-full col-start-1 overflow-hidden aspect-square rounded-xl place-self-center">
                <img src={imageUrl} alt={gender} />
              </picture>
              <section className="col-span-2 col-start-2 text-start">
                <h2>{name}</h2>
                <p className="text-sm">{artists}</p>
                <p className="text-sm">{duration}</p>
              </section>
            </button>
            <button className="content-center col-start-4">
              <Options />
            </button>
          </motion.section>
        )
      )}
    </motion.article>
  );
}
