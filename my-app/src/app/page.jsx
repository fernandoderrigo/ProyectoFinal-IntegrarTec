import Songs from './components/music/songs/Song';
import Gender from './components/music/gender/Gender';
import Playlist from './components/music/playlist/Playlist';
import Reproduction from './components/reproduction/Reproduction';
import Header from './components/header/Header';
import NavBar from './components/navigation-bar/NavigationBar';

export default async function Page() {
  // let data = await fetch('http://localhost:3001/api/index');
  // let posts = await data.json();
  return (
    <>
      <Header />
      <Songs />
      <Gender />
      <Playlist />
      <Reproduction />
      <NavBar />
      {/* <p>{posts}</p> */}
    </>
  );
}
