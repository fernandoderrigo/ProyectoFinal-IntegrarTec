import Songs from '@/components/common/music/songs/Song';
import Gender from '@/components/common/music/gender/Gender';
import Playlist from '@/components/common/music/playlist/Playlist';
import Reproduction from '@/components/common/reproduction/Reproduction';
import Header from '@/components/profile/header/Header';
import NavBar from '@/components/common/navigation-bar/NavigationBar';

export default async function Page() {
  // let data = await fetch('http://localhost:3001/api/index');
  // let posts = await data.json();
  return (
    <>
      <Header />
      <main className='mt-16 mb-40'>
      <Songs />
      <Gender />
      <Playlist />
      </main>
      <footer className='fixed bottom-0 w-full'>

      <Reproduction />
      <NavBar />
      </footer>
      {/* <p>{posts}</p> */}
    </>
  );
}
