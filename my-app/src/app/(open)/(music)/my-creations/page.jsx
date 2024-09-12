import Artist from '@/components/common/music/artist/Artist';
import Playlist from '@/components/common/music/playlist/Playlist';
import Songs from '@/components/common/music/songs/Song';
import SearchBar from '@/components/common/search-component/search-bar/SearchBar';
import Link from 'next/link';

export default function search() {
  return (
    <>
      <SearchBar />
      <Link href="/my-creations/create-song">
        Crear
      </Link>
      <Songs />
      <Playlist />
      <Artist />
    </>
  );
}
