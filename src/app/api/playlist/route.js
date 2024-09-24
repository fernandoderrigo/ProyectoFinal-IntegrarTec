import { NextResponse } from 'next/server';

export async function GET(request) {
  const accessToken = request.headers.get('Authorization')?.split(' ')[1];
  console.log(accessToken);
  try {
    const playlistResponse = await fetch(
      'http://localhost:3001/api/playlists',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(playlistResponse);
    if (!playlistResponse.ok) {
      const errorData = await playlistResponse.json();
      return NextResponse.json(
        { error: errorData.error || 'Error fetching songs' },
        { status: playlistResponse.status }
      );
    }
    const playlists = await playlistResponse.json();

    // Process playlist data
    const playlistsData = playlists.map(
      ({ id, name, id_user, users, song_in_playlist }) => {
        return {
          id,
          name,
          id_user,
          nick_Name: users.nick_Name,
          image_Url: users.image_Url,
          playlistSongs: song_in_playlist.map(({ id_Song }) => id_Song),
        };
      }
    );
    console.log(
      JSON.stringify(
        playlistsData.map(({ playlistSongs }) => playlistSongs),
        null,
        2
      )
    );
    await new Promise((resolve) => setTimeout(resolve, 4000));

    return NextResponse.json(playlistsData);
  } catch (error) {
    console.error('Error fetching playlists:', error);
    return NextResponse.json(
      { error: 'Error fetching playlists' },
      { status: 500 }
    );
  }
}
