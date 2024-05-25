import { ReactNode, createContext } from "react";

export interface AuthUser {
    id: string;
    email: string;
    role: string;
  }
  
export interface AuthContextProps {
    isLoggedIn: boolean;
    user: AuthUser | null;
    login: (token: string) => void;
    logout: () => void;
}

export interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({
    isLoggedIn: false,
    user: null,
    login: (token:string) => {},
    logout: () => {}
  });