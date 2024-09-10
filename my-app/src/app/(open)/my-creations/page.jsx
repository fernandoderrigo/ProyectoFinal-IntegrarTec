import Artist from '@/app/components/music/artist/Artist';
import Playlist from '@/app/components/music/playlist/Playlist';
import Songs from '@/app/components/music/songs/Song';
import SearchBar from '@/app/components/search-component/search-bar/SearchBar';
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
