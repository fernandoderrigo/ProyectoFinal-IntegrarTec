'use client';

import React, { useState } from 'react';
import SongList from '@/components/common/music/songs/Songs';
import SelectGender from '@/components/common/music/gender/SelectGender';
import SelectPlaylist from '@/components/common/music/playlist/SelectPlaylist';
import { useRestartScroll } from '@/hooks/useRestartScroll';
import Microphone from '@/components/common/navigation-bar/Microphone';
import Reproduction from '@/components/common/reproduction/Reproduction'; 

export default function Page() {
  useRestartScroll();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [searchTerm] = useState('');
  
  // Funciones para controlar la música
  const playSong = (song) => {
    console.log(`Reproduciendo canción: ${song}`);
    // Lógica de reproducción
  };

  const pauseSong = () => {
    console.log('Pausar canción');
    // Lógica de pausa
  };

  const nextSong = () => {
    console.log('Siguiente canción');
    // Lógica de siguiente canción
  };

  const prevSong = () => {
    console.log('Canción anterior');
    // Lógica de canción anterior
  };

  const handleGenreSelect = (genres) => {
    setSelectedGenres(genres);
  };

  const filterFunction = (song) => {
    const matchesGenre =
      selectedGenres.length === 0 ||
      selectedGenres.some((genre) => song.gender.includes(genre));
    const matchesSearch =
      song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artists.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGenre && matchesSearch;
  };

  return (
    <article className="col-span-4">
      <SelectGender onGenreSelect={handleGenreSelect} />
      <SongList filterFunction={filterFunction} />
      <SelectPlaylist filterFunction={filterFunction} />
      <Microphone
        playSong={playSong}
        pauseSong={pauseSong}
        nextSong={nextSong}
        prevSong={prevSong}
      />
      <Reproduction />
    </article>
  );
}
