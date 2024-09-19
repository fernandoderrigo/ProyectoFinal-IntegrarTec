'use client';

import { useState, useEffect } from 'react';
import Options from '../button/Options';

export default function SongList() {
  const [filter, setFilter] = useState('');
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
    song.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className='col-span-4'>
      <section>
        {filteredSongs.map(({ id, name, duration, gender, imageUrl, audioUrl, artists}) => (
          <article key={id} className="px-4 py-5 backdrop-blur-3xl bg-neutralViolet-900/10 grid grid-cols-4 gap-4 overflow-hidden rounded-xl my-4">
            <picture className="col-start-1 overflow-hidden rounded-xl">
              <img src={imageUrl} alt={gender} />
            </picture>
            <section className="col-start-2 col-span-2">
              <h2>{name}</h2>
              <p className='text-sm'>{artists}</p>
              <p className='text-sm'>{duration}</p>
            </section>
            <button className="content-center col-span-1 col-start-4 ">
              <Options />
            </button>
        </article>
        ))}
      </section>
    </div>
  );
}
