'use client';

import React, { useState } from 'react';
import SongList from '@/components/common/music/songs/Songs';
import SelectGender from '@/components/common/music/gender/SelectGender';
import SelectPlaylist from '@/components/common/music/playlist/SelectPlaylist';
import LoadingPage from '@/components/loading/MyPlaylist';
import { Suspense } from 'react';
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
      selectedGenres.length === 0 ||
      selectedGenres.some((genre) => song.gender.includes(genre));
    const matchesSearch =
      song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artists.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGenre && matchesSearch;
  };

  return (
    <Suspense fallback={<LoadingPage />}>
      <SelectGender onGenreSelect={handleGenreSelect} />
      <SongList filterFunction={filterFunction} />
      <SelectPlaylist filterFunction={filterFunction} />
    </Suspense>
  );
}
