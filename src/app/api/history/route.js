import { NextResponse } from 'next/server';
import { Decode } from '@/utils/jwtDecode';
export async function GET(request) {
  const accessToken = request.headers.get('Authorization')?.split(' ')[1];
  if (!accessToken) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }
  const tokenDecode = Decode(accessToken);
  if (!tokenDecode) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
  const userId = tokenDecode.id;
  console.log(accessToken);
  try {
    const historyResponse = await fetch(
      `http://localhost:3001/api/user-history/user/${userId}`,
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

    const processedHistoryData = historyData.map(
      ({ id_user, id_song, date }) => {
        return {
          idUser: id_user,
          idSong: id_song,
          date,
        };
      }
    );
    await new Promise((resolve) => setTimeout(resolve, 4000));
    console.log(processedHistoryData);

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
    // Crear el historial del usuario en la base de datos
    const response = await fetch(`http://localhost:3001/api/user-history`, {
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
      const errorData = await response.json(); // Cambiado para obtener los datos de error correctamente
      return NextResponse.json(
        { error: errorData.error || 'Error creating history' },
        { status: response.status }
      );
    }

    const data = await response.json(); // Asegúrate de obtener los datos de la respuesta
    console.log('User history created:', data);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating user history:', error);
    return NextResponse.json(
      { error: 'Error creating user history' },
      { status: 500 }
    );
  }
}
