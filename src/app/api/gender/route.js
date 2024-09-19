import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('http://localhost:3001/api/songs');
    const songs = await response.json();

    // Crear un objeto para almacenar géneros e imágenes
    const genderToImage = {};

    // Rellenar el objeto con datos
    songs.forEach((song) => {
      const genders = song.gender.split(',').map((gender) => gender.trim());
      const imageUrl = song.image_Url; // Asegúrate de usar el nombre correcto de la propiedad

      genders.forEach((gender) => {
        // Solo asigna la imagen si el género aún no tiene una imagen asociada
        if (!genderToImage[gender]) {
          genderToImage[gender] = imageUrl;
        }
      });
    });

    // Convertir el objeto a un formato JSON adecuado
    const genderImagePairs = Object.keys(genderToImage).map((gender) => ({
      gender,
      image: genderToImage[gender],
    }));

    return NextResponse.json(genderImagePairs);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}
