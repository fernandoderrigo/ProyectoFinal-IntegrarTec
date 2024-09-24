'use client';

import { useEffect, useState } from 'react';
import SongList from '@/components/common/music/songs/Songs';
import { Suspense } from 'react';

export default function History() {
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
          const sortedHistory = data.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          console.log("orden");

          console.log(sortedHistory)
          setHistory(sortedHistory);
        } else {
          console.error('Error al obtener las canciones');
        }
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    }
    fetchhistory();
  }, []);

  const filterFunction = (song) => {
    return (
      history.filter((historyItem) => historyItem.idSong === song.id).length > 0
    );
  };

  const SkeletonSong = () => (
    <section className="grid grid-cols-4 gap-4 px-4 py-5 my-4 bg-neutralViolet-900/40 rounded-xl animate-pulse">
      <div className="grid grid-cols-3 col-span-3 col-start-1 gap-4">
        <div className="w-full col-start-1 overflow-hidden bg-gray-300 aspect-square rounded-xl" />
        <div className="col-span-2 col-start-2 text-start">
          <div className="w-3/4 h-4 mb-2 bg-gray-300 rounded" />
          <div className="w-1/2 h-3 mb-2 bg-gray-300 rounded" />
          <div className="w-1/4 h-3 bg-gray-300 rounded" />
        </div>
      </div>
      <div className="content-center col-start-4">
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
      </div>
    </section>
  );

  return (
    <>
      {/* <p>{history}</p> */}
      <Suspense fallback={<SkeletonSong />}>
        <SongList filterFunction={filterFunction} />
      </Suspense>
    </>
  );
}
