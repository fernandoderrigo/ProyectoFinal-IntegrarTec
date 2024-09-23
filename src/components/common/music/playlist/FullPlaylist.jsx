'use client';
import SongList from '@/components/common/music/songs/Songs';
import { IoIosCloseCircleOutline } from 'react-icons/io';

export default function FullPlaylist({ hideFullPlaylist, playlist }) {
  const filterFunction = (song) => {
    if (!playlist || !playlist.playlistSongs) return false;
    return playlist.playlistSongs.some(
      (playlistSong) => playlistSong === song.id
    );
  };


  return (
    <>
      <section className="col-span-4 row-start-1">
        <button onClick={hideFullPlaylist}>
          <IoIosCloseCircleOutline className="text-4xl text-white" />
        </button>
      </section>
      {playlist && (
        <div>
          <h2>{playlist.name}</h2>
          <p>Created by {playlist.nick_Name}</p>
          <ul>
            {playlist.playlistSongs.map((song) => (
              <li key={song}>{song}</li>
            ))}
          </ul>
        </div>
      )}
      <SongList filterFunction={filterFunction} />
    </>
  );
}
