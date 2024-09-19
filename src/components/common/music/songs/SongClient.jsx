// app/songs/SongList.js
'use client'; // Declaramos que este componente es del cliente

import { useState } from 'react';

export default function SongList({ songs }) {
  const [filter, setFilter] = useState('');

  const filteredSongs = songs.filter((song) =>
    song.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Filtrar canciones..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {filteredSongs.map(({ id, name, duration, gender, imageUrl, audioUrl, artists }) => (
          <li key={id}>
            <img src={imageUrl} alt={name} width={100} />
            <h2>{name}</h2>
            <p>Duración: {duration}</p>
            <p>Género: {gender}</p>
            <p>Artistas: {artists.join(', ')}</p>
            <audio controls src={audioUrl}>
              Tu navegador no soporta la reproducción de audio.
            </audio>
          </li>
        ))}
      </ul>
    </div>
  );
}
