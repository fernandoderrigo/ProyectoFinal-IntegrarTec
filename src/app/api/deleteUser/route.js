import { NextResponse } from 'next/server';
import { Decode } from '@/utils/jwtDecode';

export async function DELETE(request) {
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
    const deleteResponse = await fetch(
      `http://localhost:3001/api/users/${userId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!deleteResponse.ok) {
      const errorData = await deleteResponse.json();
      return NextResponse.json(
        { error: errorData.error || 'Error deleting user' },
        { status: deleteResponse.status }
      );
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return NextResponse.json(
      { message: 'User deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Error deleting user' }, { status: 500 });
  }
}
