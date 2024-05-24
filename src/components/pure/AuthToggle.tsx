import React from 'react'
import '../../styles/authPage.css'


interface AuthToggleProps {
    onSignUpClick: () => void;
    onSignInClick: () => void;
  }
  
  const AuthToggle: React.FC<AuthToggleProps> = ({ onSignUpClick, onSignInClick }) => {
    return (
      <section className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>¿Eres nuevo?</h1>
            <p>Registrate para acceder a las funcionalidades</p>
            <button className="hidden" id="login" onClick={onSignInClick}>
              Registrate
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hola de nuevo</h1>
            <p>Incia Sesion para acceder a todas las funcionalidades</p>
            <button className="hidden" id="register" onClick={onSignUpClick}>
              Login
            </button>
          </div>
        </div>
      </section>
    );
  };
  
export default AuthToggle;