import Songs from '@/components/common/music/songs/Song';
import Gender from '@/components/common/music/gender/Gender';
import Playlist from '@/components/common/music/playlist/Playlist';

export default async function Page() {
  // let data = await fetch('http://localhost:3001/api/index');
  // let posts = await data.json();
  return (
    <>
        <Songs />
        <Gender />
        <Playlist />
    </>
  );
}
