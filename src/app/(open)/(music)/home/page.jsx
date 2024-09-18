import React from 'react';
import Songs from '@/components/common/music/songs/Song';
import Gender from '@/components/common/music/gender/Gender';
import Playlist from '@/components/common/music/playlist/Playlist';

export default function Page() {

  return (
    <>
        <Songs />
        <Gender />
        <Playlist />
    </>
  );
}
