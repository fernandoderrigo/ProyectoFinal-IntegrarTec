import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('http://localhost:3001/api/songs');
    const SONGS = await response.json();

    const songsData = SONGS.map(
      ({
        id,
        name,
        duration,
        gender,
        image_Url,
        audio_Url,
        artistsOnSongs,
      }) => ({
        id,
        name,
        duration,
        gender,
        imageUrl: image_Url,
        audioUrl: audio_Url,
        // Convertimos los artistas en un array de nombres
        artists: artistsOnSongs.map((artist) => artist.artists.name).join(', '),
      })
    );

    return NextResponse.json(songsData);
  } catch (error) {
    console.error('Error fetching songs:', error);
    return NextResponse.json(
      { error: 'Error fetching songs' },
      { status: 500 }
    );
  }
}
