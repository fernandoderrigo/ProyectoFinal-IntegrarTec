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
