import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();

    // Construir el objeto de datos del usuario directamente desde formData
    const userData = {
      first_Name: formData.get('first_Name'),
      last_Name: formData.get('last_Name'),
      nick_Name: formData.get('nick_Name'),
      birthDay_date: formData.get('birthDay_date'),
      email: formData.get('email'),
      password: formData.get('password'),
      image_Url: formData.get('image_Url'), // El archivo se puede enviar directamente
    };

    // Enviar el formData directamente al backend
    const response = await fetch('http://localhost:3001/api/users', {
      method: 'POST',
      body: formData, // Enviar FormData directamente
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error || 'Error registering user' },
        { status: response.status }
      );
    }

    const data = await response.json();
    await new Promise((resolve) => setTimeout(resolve, 4000));

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
