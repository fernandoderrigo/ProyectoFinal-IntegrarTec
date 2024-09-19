// app/songs/page.js
import SongList from './SongClient';

export default async function SongPage() {
  const songsData = await fetch('http://localhost:3000/api/filter');

  return <SongList songs={songsData} />;
}
