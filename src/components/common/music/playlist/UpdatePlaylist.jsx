'use client';

import { useEffect, useRef, useState } from 'react';
import SongsInPlaylist from './SongsInPlaylist';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { usePlaylist } from '@/contexts/PlaylistContext';
import { tokenExpired } from '@/utils/jwtDecode';

export default function UpdatePlaylist({ hideUpdatePlaylist, playlist }) {
  const modalRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [playlistName, setPlaylistName] = useState(playlist?.name || '');
  const { selectedSongs, setSelectedSongs } = usePlaylist();
  const [isUpdating, setIsUpdating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = tokenExpired();
    setToken(token);
  }, []);

  useEffect(() => {
    setSelectedSongs(playlist.playlistSongs || []);
  }, [playlist, setSelectedSongs]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        hideUpdatePlaylist();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [hideUpdatePlaylist]);

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

  const handleUpdatePlaylist = async () => {
    if (!token) return;
    setIsUpdating(true);

    try {
      let response = await fetch(`/api/playlist`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: playlist.id,
          name: playlistName,
          songs: selectedSongs,
          idUser: playlist.id_user
        }),
      });

      if (response.ok) {
        console.log('Playlist actualizada');
        hideUpdatePlaylist();
      } else {
        console.error('Error al actualizar la playlist');
      }
    } catch (error) {
      console.error('Error updating playlist:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      hideUpdatePlaylist();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className="w-full h-full overflow-hidden bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        <section className="flex flex-col h-full">
          <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-violet-900">
            <div>
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
                  className="text-xl font-bold cursor-pointer"
                >
                  {playlistName}
                </h2>
              )}
              <p className="text-sm text-neutralViolet-300">
                {playlist.nick_Name}
              </p>
            </div>
            <button
              onClick={hideUpdatePlaylist}
              className="transition-colors text-neutralViolet-50 hover:text-neutralViolet-200"
              aria-label="Cerrar lista de reproducción"
            >
              <IoIosCloseCircleOutline className="text-4xl" />
            </button>
          </header>
          <div className="flex-grow pb-40 overflow-y-auto">
            <SongsInPlaylist
              playlistSongs={playlist.playlistSongs}
              searchTerm={searchTerm}
            />
          </div>
          <footer className="sticky bottom-0 flex justify-between p-4 bg-violet-800">
            <p className="text-neutralViolet-200">
              {selectedSongs.length} canciones seleccionadas
            </p>
            <button
              onClick={handleUpdatePlaylist}
              disabled={isUpdating}
              className={`px-4 py-2 font-semibold rounded ${
                isUpdating
                  ? 'bg-violet-600 text-neutralViolet-400 cursor-not-allowed'
                  : 'bg-violet-500 text-neutralViolet-50 hover:bg-violet-600'
              }`}
            >
              {isUpdating ? 'Actualizando...' : 'Actualizar Playlist'}
            </button>
          </footer>
        </section>
      </div>
    </div>
  );
}
