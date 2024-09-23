import Artist from '@/components/common/music/artists/Artist';
import SelectPlaylist from '@/components/common/music/playlist/SelectPlaylist';
import Gender from '@/components/common/music/gender/Gender';
import SearchBar from '@/components/common/search-component/search-bar/SearchBar';
import LoadingPage from '@/components/loading/MyPlaylist';
import { Suspense } from 'react';

export default function search() {
  return (
    <Suspense fallback={<LoadingPage/>}>
      <SearchBar />
      <Gender />
      <SelectPlaylist />
      <Artist />
    </Suspense>
  );
}
