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

    if (!accessToken) return null;
    const tokenDecode = jwtDecode(accessToken);

    const expirationTime = tokenDecode.exp;
    const currentTime = Math.floor(Date.now() / 1000);
    const expired = expirationTime < currentTime;
    const token = expired ? refreshToken : accessToken;

    return token;
  } catch (error) {
    console.error('Error decodificando el token:', error);
    return null;
  }
};
