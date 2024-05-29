import React, { useState, useEffect, useContext } from 'react'
import '../styles/authPage.css'
import LoginForm from '../components/Auth/forms/LoginForm';
import RegisterForm from '../components/Auth/forms/RegisterForm';
import AuthToggle from '../components/Auth/AuthToggle';
import { AuthContext, AuthUser } from '../utils/Interfaces/AuthInterface';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';



const AuthPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const { isLoggedIn, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [hasCheckedToken, setHasCheckedToken] = useState(false);

  useEffect(() => {
    if (!hasCheckedToken) {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const user: AuthUser = jwtDecode(token);
          login(token);
          setHasCheckedToken(true); 
          if (user.role === 'admin') {
            navigate('/admin');
          } else if (user.role === 'terapeuta') {
            navigate('/terapeuta');
          } else if (user) {
            navigate('/paciente');
          }
        } catch (error) {
          console.error('Invalid token:', error);
          localStorage.removeItem('token');
          setHasCheckedToken(true);
        }
      } else {
        setHasCheckedToken(true);
      }
    }
  }, [hasCheckedToken, login, navigate]);

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  if (isLoggedIn) {
    return null; // Prevent the auth page from being shown if the user is already logged in
  }

  return (
    <div className='auth-fondo'>
      <div className={`container-Auth ${isSignUp ? 'active' : ''}`}>
        <LoginForm />
        <RegisterForm />
        <AuthToggle onSignUpClick={handleSignUpClick} onSignInClick={handleSignInClick} />
      </div>
    </div>
  );
};

export default AuthPage;
