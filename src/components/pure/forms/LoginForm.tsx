import React from 'react';
import { FaGoogle, FaGithub, FaLinkedin } from 'react-icons/fa';
import '../../../styles/authPage.css'
import { Input } from '@mui/material'


export default function LoginForm() {

  return (
    <section className="form-container sing-in">
    <form>
        <h1>Login</h1>
        <div className="social-icons">
            <a href="https://github.com/pMoralesDev" className="icon">
              <FaGoogle/>
            </a>
            <a href="https://github.com/pMoralesDev" className="icon">
                <FaGithub/>
            </a>
            <a href="https://github.com/pMoralesDev" className="icon">
                <FaLinkedin/>
            </a>
        </div>
            <span>Conectate con tu email</span>
            <Input type='email' placeholder='Email'></Input>
            <Input type='password' placeholder='Password'></Input>
            <a href="https://github.com/pMoralesDev">Olvide mi contraseña</a>
            <button>Log in</button>
    </form>
  </section>
  )
}
