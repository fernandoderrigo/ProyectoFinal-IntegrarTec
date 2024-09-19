import Artist from '@/components/common/music/artists/Artists';
import Playlist from '@/components/common/music/playlist/Playlist';
import Songs from '@/components/common/music/songs/Songs';
import SearchBar from '@/components/common/search-component/search-bar/SearchBar';
import Tags from '@/components/common/search-component/filter/Filter';
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
