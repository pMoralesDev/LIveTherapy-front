import { FC, useEffect, useState } from "react";
import { AuthContext, AuthProviderProps, AuthUser } from "../../utils/Interfaces/AuthInterface";
import { jwtDecode } from "jwt-decode";

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<AuthUser | null>(null);
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
        const decoded: AuthUser = jwtDecode(token);
        setUser(decoded);
        setIsLoggedIn(true);
        } catch (error) {
          console.error('Invalid token:', error);
          localStorage.removeItem('token');
        }
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    }, []);
  
    const login = (token: string) => {
      localStorage.setItem('token', token);
      const decoded: AuthUser = jwtDecode(token);
      setUser(decoded);
      setIsLoggedIn(true);
    };
  
    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsLoggedIn(false);
      setUser(null);
    };
  
    return (
      <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };

export default AuthProvider;