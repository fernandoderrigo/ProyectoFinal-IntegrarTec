import { NextResponse } from 'next/server';
import { Decode } from '@/utils/jwtDecode';

export async function GET(request) {
  const accessToken = request.headers.get('Authorization')?.split(' ')[1];
  const apiUrl = process.env.NEXT_PUBLIC_URL_API;

  try {
    const playlistResponse = await fetch(`${apiUrl}/playlists`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
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

  const { id, name, songs, idUser } = await request.json();
  if (idUser !== userId) {
    return NextResponse.json(
      { error: 'Unauthorized: User ID does not match' },
      { status: 403 }
    );
  }

  if (!id) {
    return NextResponse.json(
      { error: 'Playlist ID is required' },
      { status: 400 }
    );
  }

  try {
    const playlistResponse = await fetch(
      `http://localhost:3001/api/playlists/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ name, id_user: userId, songs }),
      }
    );

    if (playlistResponse.status === 204) {
      console.log('Playlist updated successfully, no content in response');
      return NextResponse.json(
        { message: 'Playlist updated successfully' },
        { status: 200 }
      );
    }

    const contentType = playlistResponse.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await playlistResponse.json();
      console.log('Playlist updated:', data);
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json(
        { error: 'Unexpected response format' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error updating playlist:', error);
    return NextResponse.json(
      { error: 'Error updating playlist' },
      { status: 500 }
    );
  }
}
