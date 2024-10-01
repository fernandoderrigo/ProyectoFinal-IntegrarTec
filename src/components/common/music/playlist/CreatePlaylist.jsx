'use client';

import { useRef, useState, useEffect } from 'react';
import SongsInPlaylist from './SongsInPlaylist';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { usePlaylist } from '@/contexts/PlaylistContext';
import { tokenExpired } from '@/utils/jwtDecode';

export default function CreatePlaylist({ hideFullPlaylist, playlist }) {
  const modalRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [playlistName, setPlaylistName] = useState(playlist?.name || '');
  const { selectedSongs } = usePlaylist();
  const [isCreating, setIsCreating] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = tokenExpired();
    setToken(token);
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event) => {
    setPlaylistName(event.target.value);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setPlaylistName(playlist?.name || '');
  };
  console.log("playlistName");

  console.log(playlistName)

  const handleCreatePlaylist = async () => {
    setIsCreating(true);
    if (!token) return;

    try {
      let response = await fetch('/api/playlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          playlistName,
          songs: selectedSongs,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Playlist creada:', data);
        hideFullPlaylist(); // Cerrar el modal después de crear la playlist
      } else {
        console.error('Error al crear la playlist');
      }
    } catch (error) {
      console.error('Error creating playlist:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      hideFullPlaylist();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className="w-full h-full max-w-4xl overflow-hidden rounded-lg shadow-lg bg-neutralViolet-900"
        onClick={(e) => e.stopPropagation()}
      >
        <section className="flex flex-col h-full">
          <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-violet-800">
            <div className="flex-grow">
              {isEditing ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={playlistName}
                    onChange={handleInputChange}
                    placeholder={playlist?.name || 'Nombre de la playlist'}
                    className="px-2 py-1 text-lg font-semibold rounded bg-violet-700 text-neutralViolet-50"
                  />
                  <button
                    onClick={handleSave}
                    className="px-3 py-1 text-sm bg-green-600 rounded hover:bg-green-700 text-neutralViolet-50"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-3 py-1 text-sm bg-red-600 rounded hover:bg-red-700 text-neutralViolet-50"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <h2
                  onClick={handleEditClick}
                  className="text-xl font-semibold cursor-pointer text-neutralViolet-50 hover:text-neutralViolet-200"
                >
                  {playlistName || playlist?.name || 'Nueva Playlist'}
                </h2>
              )}
            </div>
            <button
              onClick={hideFullPlaylist}
              className="transition-colors text-neutralViolet-50 hover:text-neutralViolet-200"
              aria-label="Cerrar lista de reproducción"
            >
              <IoIosCloseCircleOutline className="text-4xl" />
            </button>
          </header>
          <div className="flex-grow pt-4 pb-20 overflow-y-auto">
            <SongsInPlaylist filterFunction={null} />
          </div>
          <footer className="sticky bottom-0 flex justify-between p-4 bg-violet-800">
            <p className="text-neutralViolet-200">
              {selectedSongs.length} canciones seleccionadas
            </p>
            <button
              onClick={handleCreatePlaylist}
              disabled={isCreating || selectedSongs.length === 0}
              className={`px-4 py-2 font-semibold rounded ${
                isCreating || selectedSongs.length === 0
                  ? 'bg-violet-600 text-neutralViolet-400 cursor-not-allowed'
                  : 'bg-violet-500 text-neutralViolet-50 hover:bg-violet-600'
              }`}
            >
              {isCreating ? 'Creando...' : 'Crear Playlist'}
            </button>
          </footer>
        </section>
      </div>
    </div>
  );
}
