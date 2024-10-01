'use client';

import { useState } from 'react';
import Playlist from './Playlist';
import FullPlaylist from './FullPlaylist';
import UpdatePlaylist from './UpdatePlaylist';
import { PlaylistProvider } from '@/contexts/PlaylistContext';

export default function SelectPlaylist({ filterFunction, selectedGenres }) {
  const [isFullPlaylistVisible, setIsFullPlaylistVisible] = useState(false);
  const [isUpdatePlaylistVisible, setIsUpdatePlaylistVisible] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const showFullPlaylist = (playlist) => {
    setSelectedPlaylist(playlist);
    setIsFullPlaylistVisible(true);
  };

  const hideFullPlaylist = () => {
    setIsFullPlaylistVisible(false);
    setSelectedPlaylist(null);
  };

  const showUpdatePlaylist = (playlist) => {
    setSelectedPlaylist(playlist);
    setIsUpdatePlaylistVisible(true);
  };

  const hideUpdatePlaylist = () => {
    setIsUpdatePlaylistVisible(false);
    setSelectedPlaylist(null);
  };

  return (
    <section className="col-span-4">
      <Playlist
        showFullPlaylist={showFullPlaylist}
        showUpdatePlaylist={showUpdatePlaylist}
        filterFunction={filterFunction}
        selectedGenres={selectedGenres}
      />
      {isFullPlaylistVisible && selectedPlaylist && (
        <FullPlaylist
          hideFullPlaylist={hideFullPlaylist}
          playlist={selectedPlaylist}
        />
      )}
      {isUpdatePlaylistVisible && selectedPlaylist && (
        <PlaylistProvider>
          <UpdatePlaylist
            hideUpdatePlaylist={hideUpdatePlaylist}
            playlist={selectedPlaylist}
          />
        </PlaylistProvider>
      )}
    </section>
  );
}
