'use client';
import { useState } from 'react';
import Playlist from './Playlist';
import FullPlaylist from './FullPlaylist';

export default function SelectPlaylist() {
  const [isFullPlaylistVisible, setIsFullPlaylistVisible] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const setPlaylistInfo = (playlistInfo) => {
    setSelectedPlaylist(playlistInfo);
  };

  const expandPlaylistView = () => {
    setIsFullPlaylistVisible(true);
  };

  const showFullPlaylist = (playlist) => {
    setPlaylistInfo(playlist);
    expandPlaylistView();
    console.log(playlist);
  };

  const hideFullPlaylist = () => {
    setIsFullPlaylistVisible(false);
    setSelectedPlaylist(null);
  };

  return (
    <section className="col-span-4">
      {isFullPlaylistVisible ? (
        <FullPlaylist
          hideFullPlaylist={hideFullPlaylist}
          playlist={selectedPlaylist}
        />
      ) : (
        <Playlist showFullPlaylist={showFullPlaylist} />
      )}
    </section>
  );
}
