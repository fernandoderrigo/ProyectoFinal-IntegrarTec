'use client';

import { useEffect, useState } from 'react';
import SongList from '@/components/common/music/songs/Songs';
import { useRestartScroll } from '@/hooks/useRestartScroll';
import { tokenExpired } from '@/utils/jwtDecode';

export default function History() {
  useRestartScroll();
  const [history, setHistory] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = tokenExpired();
    setToken(token);
  }, []);

  useEffect(() => {
    if (!token) return;

    async function fetchhistory() {
      try {
        let response = await fetch('/api/history', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setHistory(data);
        } else {
          console.error('Error al obtener las canciones');
        }
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    }
    fetchhistory();
  }, [token]);

  const songs = history.map(({ idSong }) => idSong);

  const filterFunction = (song) => {
    return songs.some((songId) => songId === song.id);
  };

  return <SongList filterFunction={filterFunction} order={songs} />;
}
