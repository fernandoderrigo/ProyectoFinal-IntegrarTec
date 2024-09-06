import Artist from '@/app/components/music/artist/Artist';
import Playlist from '@/app/components/music/playlist/Playlist';
import Songs from '@/app/components/music/songs/Song';
import SearchBar from '@/app/components/search-component/search-bar/SearchBar';
import Tags from '@/app/components/search-component/filter/Filter';
export default function search() {
  return (
    <>
      <SearchBar />
      <Tags />
      <Songs />
      <Playlist />
      <Artist />
    </>
  );
}
