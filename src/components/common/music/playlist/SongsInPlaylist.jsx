'use client';
import { useState, useEffect } from 'react';
import { usePlaylist } from '@/contexts/PlaylistContext';
import { PlaylistFallback } from '@/components/fallback/PlaylistFallback';
import { tokenExpired } from '@/utils/jwtDecode';

export default function SongsInPlaylist({ playlistSongs, searchTerm = '' }) {
  const [songList, setSongList] = useState([]);
  const { selectedSongs, setSelectedSongs } = usePlaylist();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchedToken = tokenExpired();
    setToken(fetchedToken);
  }, []);

  useEffect(() => {
    if (!token) return;
    async function fetchSongsData() {
      try {
        let response = await fetch('/api/filter', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setSongList(data);
          setSelectedSongs(playlistSongs || []);
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
  }, [playlistSongs, setSelectedSongs, token]);

  if (loading) {
    return <PlaylistFallback />;
  }

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

  const filteredSongs = songList.filter((song) =>
    song.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedSongsList = filteredSongs.filter((song) =>
    selectedSongs.includes(song.id)
  );

  const unselectedSongsList = filteredSongs.filter(
    (song) => !selectedSongs.includes(song.id)
  );

  const renderSong = (song) => (
    <section
      key={song.id}
      className="grid grid-cols-4 gap-4 p-4 transition-colors bg-neutralViolet-800 rounded-xl hover:bg-neutralViolet-700"
    >
      <div className="flex items-center col-span-3 space-x-4">
        <picture className="w-16 h-16 overflow-hidden rounded-lg shrink-0">
          <img
            src={song.imageUrl}
            alt={song.gender}
            className="object-cover w-full h-full"
          />
        </picture>
        <div className="flex-grow">
          <h2 className="text-lg font-semibold text-neutralViolet-50">
            {song.name}
          </h2>
          <p className="text-sm text-neutralViolet-300">{song.artists}</p>
          <p className="text-xs text-neutralViolet-400">{song.duration}</p>
        </div>
      </div>
      <div className="flex items-center justify-end">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selectedSongs.includes(song.id)}
            onChange={() => handleCheckboxChange(song.id)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-neutralViolet-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-500"></div>
        </label>
      </div>
    </section>
  );

  return (
    <article className="px-4 mt-4 space-y-4">
      {selectedSongsList.map(renderSong)}
      {unselectedSongsList.map(renderSong)}
    </article>
  );
}
