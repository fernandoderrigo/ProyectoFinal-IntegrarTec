import { NextResponse } from 'next/server';
import { Decode } from '@/utils/jwtDecode';

export async function GET(request) {
  const accessToken = request.headers.get('Authorization')?.split(' ')[1];
  try {
    const playlistResponse = await fetch(
      'http://localhost:3001/api/playlists',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (!playlistResponse.ok) {
      const errorData = await playlistResponse.json();
      return NextResponse.json(
        { error: errorData.error || 'Error fetching songs' },
        { status: playlistResponse.status }
      );
    }
    const playlists = await playlistResponse.json();

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

export async function POST(request) {
  const accessToken = request.headers.get('Authorization')?.split(' ')[1];
  if (!accessToken) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }
  const tokenDecode = Decode(accessToken);
  if (!tokenDecode) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
  const userId = tokenDecode.id;
  const { playlistName, songs } = await request.json();

  if (!playlistName || !songs) {
    return NextResponse.json(
      { error: 'Missing playlistName or songs' },
      { status: 400 }
    );
  }

  console.log(songs);
  console.log(playlistName);
  console.log(userId);

  try {
    const playlistResponse = await fetch(
      'http://localhost:3001/api/playlists',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ name: playlistName, id_user: userId, songs }),
      }
    );
    if (!playlistResponse.ok) {
      const errorData = await playlistResponse.json();
      return NextResponse.json(
        { error: errorData.error || 'Error fetching playlists' },
        { status: playlistResponse.status }
      );
    }

    const data = await playlistResponse.json();
    console.log('User playlist created:', data);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error fetching playlists:', error);
    return NextResponse.json(
      { error: 'Error fetching playlists' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  const accessToken = request.headers.get('Authorization')?.split(' ')[1];
  if (!accessToken) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }
  const tokenDecode = Decode(accessToken);
  if (!tokenDecode) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
  const userId = tokenDecode.id;

  try {
    const playlistResponse = await fetch(
      'http://localhost:3001/api/playlists',
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ name, userId, songs }),
      }
    );
    if (!playlistResponse.ok) {
      const errorData = await playlistResponse.json();
      return NextResponse.json(
        { error: errorData.error || 'Error fetching playlists' },
        { status: playlistResponse.status }
      );
    }

    const data = await playlistResponse.json();
    console.log('User playlist created:', data);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error fetching playlists:', error);
    return NextResponse.json(
      { error: 'Error fetching playlists' },
      { status: 500 }
    );
  }
}
