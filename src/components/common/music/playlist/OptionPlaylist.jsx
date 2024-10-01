'use client';

import { useState } from 'react';
import UpdatePlaylist from './UpdatePlaylist';
import { SlOptions } from 'react-icons/sl';
import { PlaylistProvider } from '@/contexts/PlaylistContext';

export default function OptionPlaylist({ songsIds }) {
  const [isUpdatePlaylistVisible, setIsUpdatePlaylistVisible] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const showUpdatePlaylist = () => {
    setSelectedPlaylist(songsIds);
    setIsUpdatePlaylistVisible(true);
  };

  const hideUpdatePlaylist = () => {
    setIsUpdatePlaylistVisible(false);
    setSelectedPlaylist(null);
  };

  return (
    <section className="col-span-4">
      <button
        onClick={showUpdatePlaylist}
        className="content-center col-start-4"
      >
        <SlOptions className="basic-reproduction-button" />
      </button>
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
