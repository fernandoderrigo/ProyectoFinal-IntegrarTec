'use client';
import { useState } from 'react';
import Artist from '@/components/common/music/artists/Artists';
import SelectPlaylist from '@/components/common/music/playlist/Playlist';
import SongList from '@/components/common/music/songs/Songs';
import SearchBar from '@/components/common/search-component/search-bar/SearchBar';
import Tags from '@/components/common/search-component/filter/Filter';

export default function Search() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleGenreSelect = (genres) => {
    setSelectedGenres(genres);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
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
    <>
      <SearchBar onSearch={handleSearch} />
      <Tags onGenreSelect={handleGenreSelect} />
      <SongList filterFunction={filterFunction} />
      <SelectPlaylist />
      <Artist />
    </>
  );
}
