import { NextResponse } from 'next/server';

export async function GET(request) {
  const accessToken = request.headers.get('Authorization')?.split(' ')[1];
  const apiUrl = process.env.NEXT_PUBLIC_URL_API;

  if (!accessToken) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }
  try {
    const response = await fetch(`${apiUrl}/songs`, {
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

    const gender = await response.json();

    const genderToImage = {};

    gender.forEach((song) => {
      const gender = song.gender.split(',').map((gender) => gender.trim());
      const imageUrl = song.image_Url;
      if (!genderToImage[gender]) {
        genderToImage[gender] = imageUrl;
      }
    });

    const genderImagePairs = Object.keys(genderToImage).map((gender) => ({
      gender,
      image: genderToImage[gender],
    }));
    await new Promise((resolve) => setTimeout(resolve, 4000));

    return NextResponse.json(genderImagePairs);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}
