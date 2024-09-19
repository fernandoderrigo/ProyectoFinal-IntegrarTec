'use client';

import { useState, useEffect } from 'react';
import Options from '../button/Options';

export default function SongList({ filter = '' }) { // Recibimos el filtro como prop
  const [songList, setSongList] = useState([]);

  useEffect(() => {
    async function fetchSongsData() {
      try {
        const response = await fetch('/api/filter');
        const data = await response.json();
        setSongList(data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    }
    fetchSongsData();
  }, []);

  const filteredSongs = songList.filter(song =>
    song.name.toLowerCase().includes(filter.toLowerCase()) // Aplicamos el filtro recibido
  );

  return (
    <div className='col-span-4 px-4'>
      <section>
        { filteredSongs.map(({ id, name, duration, gender, imageUrl, audioUrl, artists }) => (
          <article key={id} className="py-5 bg-neutralViolet-900/40 grid grid-cols-4 gap-4 rounded-xl my-4 px-4">
            <picture className=" w-full aspect-square col-start-1 overflow-hidden rounded-xl">
              <img src={imageUrl} alt={gender} />
            </picture>
            <section className="col-start-2 col-span-2">
              <h2>{name}</h2>
              <p className='text-sm'>{artists}</p>
              <p className='text-sm'>{duration}</p>
            </section>
            <button className="content-center col-start-4">
              <Options />
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}
