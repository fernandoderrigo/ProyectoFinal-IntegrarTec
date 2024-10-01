'use client';

import { FaSearch, FaArrowLeft } from 'react-icons/fa';
import SongList from '../../music/songs/Songs';
import Playlist from '../../music/playlist/Playlist';
import { useState, useRef, useEffect } from 'react';

export default function FullSearchBar({ hideFullSearch }) {
  const [filterText, setFilterText] = useState('');
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        hideFullSearch();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [hideFullSearch]);

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      hideFullSearch();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className="w-full h-full max-w-4xl overflow-hidden bg-black shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <section className="flex flex-col h-full">
          <section className="flex items-center p-4 bg-neutralViolet-50">
            <button onClick={hideFullSearch} className="mr-4">
              <FaArrowLeft className="text-black basic-button" />
            </button>
            <input
              className="flex-grow p-2 text-lg text-black rounded-md bg-neutralViolet-50"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder="Buscar canciones..."
            />

            <FaSearch className="text-black basic-button" />
          </section>

          <section className="flex-grow pb-40 overflow-y-auto">
            {filterText && (
              <>
                <SongList
                  filterFunction={(song) =>
                    song.name.toLowerCase().includes(filterText.toLowerCase())
                  }
                />
                <Playlist
                  filterFunction={(playlist) =>
                    playlist.name
                      .toLowerCase()
                      .includes(filterText.toLowerCase())
                  }
                />
              </>
            )}
          </section>
        </section>
      </div>
    </div>
  );
}
