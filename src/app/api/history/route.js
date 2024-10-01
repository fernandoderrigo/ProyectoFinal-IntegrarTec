import { NextResponse } from 'next/server';
import { Decode } from '@/utils/jwtDecode';
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
  console.log(userId);
  try {
    const historyResponse = await fetch(
      `${apiUrl}/user-history/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (!historyResponse.ok) {
      const errorData = await historyResponse.json();
      return NextResponse.json(
        { error: errorData.error || 'Error fetching history' },
        { status: historyResponse.status }
      );
    }
    const historyData = await historyResponse.json();
    const sortedHistoryData = historyData.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    const filterUniqueIds = (array) => {
      const seen = new Set();
      return array.filter((item) => {
        if (!seen.has(item.id_song)) {
          seen.add(item.id_song);
          return true;
        }
        return false;
      });
    };

    const uniqueSongs = filterUniqueIds(sortedHistoryData);
    const latestTenUniqueSongs = uniqueSongs.slice(0, 10);

    const processedHistoryData = latestTenUniqueSongs.map(
      ({ id_user, id_song, date, songs }) => {
        return {
          idUser: id_user,
          idSong: id_song,
          date,
          songs,
        };
      }
    );

    await new Promise((resolve) => setTimeout(resolve, 4000));
    return NextResponse.json(processedHistoryData);
  } catch (error) {
    console.error('Error fetching history:', error);
    return NextResponse.json(
      { error: 'Error fetching history' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
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

  const body = await request.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json({ error: 'Song ID is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`${apiUrl}/user-history`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        id_user: userId,
        id_song: id,
        date: new Date(),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error || 'Error creating history' },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('User history created:', data);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating user history:', error);
  }
}
