import React from 'react';
import SongPage from '@/components/common/music/songs/SongServer';
import Gender from '@/components/common/music/gender/Gender';
import Playlist from '@/components/common/music/playlist/Playlist';

export default function Page() {

  return (
    <>
        <SongPage />
        <Gender />
        <Playlist />
    </>
  );
}
