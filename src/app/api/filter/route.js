import { NextResponse } from 'next/server';

export async function GET(request) {
  const accessToken = request.headers.get('Authorization')?.split(' ')[1];

  if (!accessToken) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  try {
    const response = await fetch('http://localhost:3001/api/songs', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error || 'Error fetching songs' },
        { status: response.status }
      );
    }
    const songs = await response.json();

    const songsData = songs.map(
      ({
        id,
        name,
        duration,
        gender,
        image_Url,
        audio_Url,
        artists_on_songs,
      }) => ({
        id,
        name,
        duration,
        gender,
        imageUrl: image_Url,
        audioUrl: audio_Url,
        artists: artists_on_songs
          .map((artist) => artist.artists.name)
          .join(', '),
      })
    );
    await new Promise((resolve) => setTimeout(resolve, 4000));

    return NextResponse.json(songsData);
  } catch (error) {
    console.error('Error fetching songs:', error);
    return NextResponse.json(
      { error: 'Error fetching songs' },
      { status: 500 }
    );
  }
}
