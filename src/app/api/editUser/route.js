import { NextResponse } from 'next/server';
import { Decode } from '@/utils/jwtDecode';

export async function PUT(request) {
  const accessToken = request.headers.get('Authorization')?.split(' ')[1];
  const apiUrl = process.env.NEXT_PUBLIC_URL_API;

  if (!accessToken) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }
  const tokenDecode = Decode(accessToken);
  if (!tokenDecode) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  const userId = tokenDecode.id;
  const data = await request.json();

  try {
    const userResponse = await fetch(`${apiUrl}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    if (userResponse.status === 204) {
      console.log('User updated successfully, no content in response');
      return NextResponse.json(
        { message: 'User updated successfully' },
        { status: 200 }
      );
    }

    const contentType = userResponse.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await userResponse.json();
      console.log('User updated:', data);
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json(
        { error: 'Unexpected response format' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Error updating user' }, { status: 500 });
  }
}

export async function GET(request) {
  const accessToken = request.headers.get('Authorization')?.split(' ')[1];
  const apiUrl = process.env.NEXT_PUBLIC_URL_API;

  if (!accessToken) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }
  const tokenDecode = Decode(accessToken);
  if (!tokenDecode) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
  const userId = tokenDecode.id;
  console.log('userId');

  console.log(userId);
  try {
    const userResponse = await fetch(`${apiUrl}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!userResponse.ok) {
      const errorData = await userResponse.json();
      return NextResponse.json(
        { error: errorData.error || 'Error fetching user data' },
        { status: userResponse.status }
      );
    }

    const userData = await userResponse.json();
    console.log('userData');

    console.log(userData);

    return NextResponse.json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json(
      { error: 'Error fetching user data' },
      { status: 500 }
    );
  }
}
