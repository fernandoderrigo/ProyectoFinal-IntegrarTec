import { NextResponse } from 'next/server';

export async function POST(request) {
  const { email, password } = await request.json();

  try {
    const response = await fetch('http://localhost:3001/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error || 'Error logging in' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error logging in:', error);

    if (error.cause && error.cause.code === 'ECONNREFUSED') {
      return NextResponse.json(
        {
          error:
            'Unable to connect to the authentication server. Please try again later.',
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
