'use client';

import { useEffect, useState } from 'react';
import SongList from '@/components/common/music/songs/Songs';
import { Suspense } from 'react';
import LoadingPage from '@/components/loading/MyPlaylist';
import { useRestartScroll } from '@/hooks/useRestartScroll';

export default function History() {
  useRestartScroll()
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const RefreshAccessToken = localStorage.getItem('refreshToken');
    async function fetchhistory() {
      try {
        let response = await fetch('/api/history', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.status === 401 && RefreshAccessToken) {
          console.log('intento con refresToken');
          response = await fetch('/api/history', {
            headers: {
              Authorization: `Bearer ${RefreshAccessToken}`,
            },
          });
        }
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
  }, []);

  const songs = history.map(({ idSong }) => idSong);

  const filterFunction = (song) => {
    return songs.some((songId) => songId === song.id);
  };

  return (

      <SongList filterFunction={filterFunction} order={songs} />
  );
}
