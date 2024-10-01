import { jwtDecode } from 'jwt-decode';

export const Decode = (token) => {
  try {
    const decoded = jwtDecode(token);
    console.log(decoded);
    return decoded;
  } catch (error) {
    console.error('Error al decodificar el token:', error);
  }
};

export const tokenExpired = () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const currentTime = Math.floor(Date.now() / 1000);

    if (!accessToken) return null;
    const refreshTokenDecode = jwtDecode(refreshToken);

    const expirationTimeRefreshToken = refreshTokenDecode.exp;
    const expiredRefreshToken = expirationTimeRefreshToken < currentTime;
    if (expiredRefreshToken) {
      async () => {
        let response = await fetch('/api/playlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            playlistName,
            songs: selectedSongs,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          console.log('Playlist creada:', data);
          hideFullPlaylist(); // Cerrar el modal después de crear la playlist
        } else {
          console.error('Error al crear la playlist');
        }
      };
    }
    const tokenDecode = jwtDecode(accessToken);

    const expirationTime = tokenDecode.exp;
    const expired = expirationTime < currentTime;
    const token = expired ? refreshToken : accessToken;

    return token;
  } catch (error) {
    console.error('Error decodificando el token:', error);
    return null;
  }
};
