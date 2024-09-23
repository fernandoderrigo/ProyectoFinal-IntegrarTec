import Artist from '@/components/common/music/artists/Artist';
import SelectPlaylist from '@/components/common/music/playlist/SelectPlaylist';
import Gender from '@/components/common/music/gender/Gender';
import SearchBar from '@/components/common/search-component/search-bar/SearchBar';

export default function search() {
  return (
    <>
      <SearchBar />
      <Gender />
      <SelectPlaylist />
      <Artist />
    </>
  );
}
