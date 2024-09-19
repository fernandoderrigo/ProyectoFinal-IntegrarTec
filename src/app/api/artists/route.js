import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('http://localhost:3001/api/artists');
    const ARTIST = await response.json();

    const artistData = ARTIST.data.map(({ id, name }) => ({
      id,
      name,
    }));
    return NextResponse.json(artistData);
  } catch (error) {
    console.error('Error fetching artists:', error);
    return NextResponse.json(
      { error: 'Error fetching artists' },
      { status: 500 }
    );
  }
}
