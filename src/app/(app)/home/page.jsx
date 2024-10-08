'use client';

import React, { useState } from 'react';
import SongList from '@/components/common/music/songs/Songs';
import SelectGender from '@/components/common/music/gender/SelectGender';
import SelectPlaylist from '@/components/common/music/playlist/SelectPlaylist';
import { useRestartScroll } from '@/hooks/useRestartScroll';

export default function Page() {
  useRestartScroll();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [searchTerm] = useState('');

  const handleGenreSelect = (genres) => {
    setSelectedGenres(genres);
  };
  const filterFunction = (song) => {
    const matchesGenre =
      selectedGenres.length === 0 || selectedGenres.includes(song.gender);
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
    </article>
  );
}
