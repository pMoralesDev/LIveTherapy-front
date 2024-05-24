import React from 'react'
import '../../../styles/authPage.css'
import { Input } from '@mui/material'
import { FaGoogle, FaGithub, FaLinkedin } from 'react-icons/fa';

export default function RegisterForm() {
  return (
    <section className='form-container sign-up'>
      <form>
        <h1>Crea una cuenta</h1>
        <div className='social-icons'>
          <a href='https://github.com/pMoralesDev' className="icon">
              <FaGoogle/>
          </a>
          <a href='https://github.com/pMoralesDev' className="icon">
              <FaGithub/>
          </a>
          <a href='https://github.com/pMoralesDev' className="icon">
              <FaLinkedin/>
          </a>
        </div>
        <span>O usa tu email para registrate</span>
        <Input type='text' placeholder='Name'></Input>
        <Input type='email' placeholder='email'></Input>
        <Input type='password' placeholder='password'></Input>
        <Input type='number' placeholder='Edad'></Input>
        <Input type='text' placeholder='Teléfono'></Input>
        <button>Registrarte</button>
      </form>
    </section>
  )
}
