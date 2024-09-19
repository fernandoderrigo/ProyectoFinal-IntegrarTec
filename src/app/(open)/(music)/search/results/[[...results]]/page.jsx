import Artist from '@/components/common/music/artists/Artist';
import Playlist from '@/components/common/music/playlist/Playlist';
import Gender from '@/components/common/music/gender/Gender';
import SearchBar from '@/components/common/search-component/search-bar/SearchBar';

export default function search() {
  return (
    <>
      <SearchBar />
      <Gender />
      <Playlist/>
      <Artist/>
    </>
  );
}
