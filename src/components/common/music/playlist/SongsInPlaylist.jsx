'use client';
import { useState, useEffect } from 'react';
import { usePlaylist } from '@/contexts/PlaylistContext';

export default function SongsInPlaylist({ filterFunction, order = [] }) {
  const [songList, setSongList] = useState([]);
  const { selectedSongs, setSelectedSongs } = usePlaylist();

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
          console.log('Intento con refreshToken');
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
      }
    }

    fetchSongsData();
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedSongs((prevSelected) => {
      const updatedSelected = new Set(prevSelected);
      if (updatedSelected.has(id)) {
        updatedSelected.delete(id);
      } else {
        updatedSelected.add(id);
      }
      return Array.from(updatedSelected);
    });
  };

  const filteredSongs = filterFunction
    ? songList
        .filter(filterFunction)
        .sort((a, b) =>
          order.length > 0 ? order.indexOf(a.id) - order.indexOf(b.id) : 0
        )
    : songList;

  return (
    <article className="px-4 space-y-4">
      {filteredSongs.map(
        ({ id, name, duration, gender, imageUrl, audioUrl, artists }) => (
          <section
            key={id}
            className="grid grid-cols-4 gap-4 p-4 transition-colors bg-neutralViolet-800 rounded-xl hover:bg-neutralViolet-700"
          >
            <div className="flex items-center col-span-3 space-x-4">
              <picture className="w-16 h-16 overflow-hidden rounded-lg shrink-0">
                <img
                  src={imageUrl}
                  alt={gender}
                  className="object-cover w-full h-full"
                />
              </picture>
              <div className="flex-grow">
                <h2 className="text-lg font-semibold text-neutralViolet-50">
                  {name}
                </h2>
                <p className="text-sm text-neutralViolet-300">{artists}</p>
                <p className="text-xs text-neutralViolet-400">{duration}</p>
              </div>
            </div>
            <div className="flex items-center justify-end">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedSongs.includes(id)}
                  onChange={() => handleCheckboxChange(id)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-neutralViolet-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-500"></div>
              </label>
            </div>
          </section>
        )
      )}
    </article>
  );
}
