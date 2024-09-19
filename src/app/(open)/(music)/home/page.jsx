import React from 'react';
import SongList from '@/components/common/music/songs/Songs';
import Gender from '@/components/common/music/gender/Gender';
import Playlist from '@/components/common/music/playlist/Playlist';

export default function Page() {

  return (
    <>
        <SongList />
        <Gender />
        <Playlist />
    </>
  );
}
