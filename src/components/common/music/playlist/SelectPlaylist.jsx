'use client';

import { useState } from 'react';
import Playlist from './Playlist';
import FullPlaylist from './FullPlaylist';
import { Suspense } from 'react';

export default function SelectPlaylist() {
  const [isFullPlaylistVisible, setIsFullPlaylistVisible] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const showFullPlaylist = (playlist) => {
    setSelectedPlaylist(playlist);
    setIsFullPlaylistVisible(true);
  };

  const hideFullPlaylist = () => {
    setIsFullPlaylistVisible(false);
    setSelectedPlaylist(null);
  };

  const SkeletonPlaylist = () => (
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
    <section className="col-span-4">
      <Suspense fallback={<SkeletonPlaylist />}>
        <Playlist showFullPlaylist={showFullPlaylist} />
      </Suspense>
      {isFullPlaylistVisible && selectedPlaylist && (
        <FullPlaylist
          hideFullPlaylist={hideFullPlaylist}
          playlist={selectedPlaylist}
        />
      )}
    </section>
  );
}
