import { NextResponse } from 'next/server';

export async function GET(request) {
  console.log('inicio de todo');
  const accessToken = request.headers.get('Authorization')?.split(' ')[1];
  console.log(accessToken);

  if (!accessToken) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }
  try {
    const response = await fetch('http://localhost:3001/api/artists', {
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

    const data = await response.json();
    await new Promise((resolve) => setTimeout(resolve, 4000));

    return NextResponse.json(data.data);
  } catch (error) {
    console.error('Error in login API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
