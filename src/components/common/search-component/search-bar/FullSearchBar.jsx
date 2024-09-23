'use client'

import { FaSearch } from 'react-icons/fa';
import { FaArrowLeft } from "react-icons/fa";
import SongList from '../../music/songs/Songs';
import { useState } from 'react';

export default function FullSearchBar({ hideFullSearch }) {
  const [filterText, setFilterText] = useState("");
  return (
    <section className="absolute top-0 right-0 z-10 grid w-screen h-screen grid-cols-4 gap-4 px-4 bg-black">
      <section className="fixed top-0 right-0 z-20 col-span-4">
        <label
          htmlFor=""
          className="grid items-baseline w-full grid-cols-5 p-2 bg-neutralViolet-50 justify-items-center"
        >
          <button onClick={hideFullSearch}>
            <FaArrowLeft className="text-black basic-button place-self-center" />
          </button>
          <input
            className="col-span-3 p-1 text-lg text-black bg-neutralViolet-50 place-self-center"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)} // Capturamos el texto del input
            placeholder="Buscar canciones..."
          />
          <FaSearch className="text-black basic-button place-self-center" />
        </label>
      </section>
      <section className="col-span-4 pb-48 mt-12">
        {filterText && (
          <SongList
            filterFunction={(song) =>
              song.name.toLowerCase().includes(filterText.toLowerCase())
            }
          />
        )}
      </section>
    </section>
  );
}
