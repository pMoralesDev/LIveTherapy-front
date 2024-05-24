import React, { useState } from 'react'
import '../styles/authPage.css'
import LoginForm from '../components/pure/forms/LoginForm'
import RegisterForm from '../components/pure/forms/RegisterForm'
import AuthToggle from '../components/pure/AuthToggle'


export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  return (
    <div className={`container ${isSignUp ? 'active' : ''}`}>
      <LoginForm />
      <RegisterForm />
      <AuthToggle 
        onSignUpClick={handleSignUpClick} 
        onSignInClick={handleSignInClick} 
      />
    </div>
  );
}
