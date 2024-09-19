export default async function songData(_req, res) {
  try {
    const response = await fetch('http://localhost:3001/api/songs');
    const SONGS = await response.json();

    // Mapear una sola vez para obtener los datos estructurados
    const songsData = SONGS.map(
      ({
        id,
        name,
        duration,
        gender,
        image_Url,
        audio_Url,
        artistsOnSongs,
      }) => ({
        id,
        name,
        duration,
        gender,
        imageUrl: image_Url,
        audioUrl: audio_Url,
        artists: artistsOnSongs,
      })
    );

    // Devolver los datos estructurados
    return res.status(200).json(songsData);
  } catch (error) {
    console.error('Error fetching songs:', error);
    return res.status(500).json({ error: 'Error fetching songs' });
  }
}
