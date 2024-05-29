import { jwtDecode } from "jwt-decode";

interface ITokenPayload {
    id: string;
    email: string;
    role: string;
    iat?: number;
    exp?: number;
}

export const getUserIdFromToken = (token: string): string | null => {
    try {
      const decoded: ITokenPayload = jwtDecode(token);
      return decoded.id;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
};