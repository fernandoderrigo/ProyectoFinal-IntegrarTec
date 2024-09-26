'use client';

import { useState, useEffect } from 'react';
import CreatePlaylist from './CreatePlaylist';
import { FaPlus } from 'react-icons/fa';
import { PlaylistProvider } from '@/contexts/PlaylistContext';


export default function PlaylistCreator() {
  const [isCreatePlaylistVisible, setIsCreatePlaylistVisible] = useState(false);

  useEffect(() => {
    if (isCreatePlaylistVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isCreatePlaylistVisible]);

  const showCreatePlaylist = () => {
    setIsCreatePlaylistVisible(true);
  };

  const hideCreatePlaylist = () => {
    setIsCreatePlaylistVisible(false);
  };

  return (
    <div className="relative col-span-4">
      <button
        onClick={showCreatePlaylist}
        className="flex items-center justify-center w-full p-3 transition-colors rounded-lg bg-violet-600 hover:bg-violet-700"
      >
        <FaPlus className="mr-2" />
        <span>Crear Nueva Playlist</span>
      </button>
      {isCreatePlaylistVisible && (
        <PlaylistProvider>
          <CreatePlaylist hideFullPlaylist={hideCreatePlaylist} />
        </PlaylistProvider>
      )}
    </div>
  );
}
