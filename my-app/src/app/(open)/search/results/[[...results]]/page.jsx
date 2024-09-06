import Artist from '@/app/components/music/artist/Artist';
import Playlist from '@/app/components/music/playlist/Playlist';
import Gender from '@/app/components/music/gender/Gender';
import SearchBar from '@/app/components/search-component/search-bar/SearchBar';

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
