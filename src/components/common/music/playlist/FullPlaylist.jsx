'use client';

import { useEffect, useRef } from 'react';
import SongList from '@/components/common/music/songs/Songs';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { Suspense } from 'react';

export default function FullPlaylist({ hideFullPlaylist, playlist }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        hideFullPlaylist();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [hideFullPlaylist]);

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      hideFullPlaylist();
    }
  };

  const filterFunction = (song) => {
    if (!playlist || !playlist.playlistSongs) return false;
    return playlist.playlistSongs.some(
      (playlistSong) => playlistSong === song.id
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className="w-full h-full max-w-4xl overflow-hidden bg-black rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <section className="flex flex-col h-full">
          {/* Cabecera fija */}
          <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-violet-900">
            <div>
              <h2 className="text-xl font-bold">{playlist.name}</h2>
              <p className="text-sm text-neutralViolet-300">
                {playlist.nick_Name}
              </p>
            </div>
            <button
              onClick={hideFullPlaylist}
              className="transition-colors text-neutralViolet-50 hover:text-neutralViolet-200"
              aria-label="Cerrar lista de reproducción"
            >
              <IoIosCloseCircleOutline className="text-4xl" />
            </button>
          </header>

          {/* Contenido desplazable */}
          <div className="flex-grow pb-40 overflow-y-auto">
            <Suspense fallback={<SkeletonSong />}>
              <SongList filterFunction={filterFunction} />
            </Suspense>
          </div>
        </section>
      </div>
    </div>
  );
}
