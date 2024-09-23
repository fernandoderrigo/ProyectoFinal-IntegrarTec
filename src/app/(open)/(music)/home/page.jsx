import React from 'react';
import SongList from '@/components/common/music/songs/Songs';
import Gender from '@/components/common/music/gender/Gender';
import SelectPlaylist from '@/components/common/music/playlist/SelectPlaylist';

export default function Page() {

  return (
    <>
      <SongList />
      <Gender />
      <SelectPlaylist />
    </>
  );
}
