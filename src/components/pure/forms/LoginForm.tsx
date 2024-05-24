import React from 'react';
import { FaGoogle, FaGithub, FaLinkedin } from 'react-icons/fa';
import '../../../styles/authPage.css'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login } from '../../../service/authService';
import { AxiosResponse } from 'axios';

// Definimos el schema de validacion con yup
const loginSchema = Yup.object().shape(
  {
    email: Yup.string().email('Formato de email no valido').required(''),
    password: Yup.string().required('')
  }
)

export default function LoginForm() {

  const initialCredentials = {
    email:'',
    password:''
  }

  return (
    <section className="form-container sing-in">
    <div className='sub-container'>
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
        <Formik initialValues={initialCredentials} validationSchema={loginSchema}
          onSubmit={ async(values) => {
            login(values.email, values.password).then((res:AxiosResponse) => {
              if(res.status === 200){
                if(res.data.token){
                  sessionStorage.setItem('sessionToken', res.data.token)
                }else{throw new Error('No se ha recibido token de acceso')}               
              }else { throw new Error('Error en el servidor')}
            }).catch((err)=> {
              console.error(`[LOGIN ERROR] Error al intentar inciar sesion ${err}`)})
          }}>
            {
              ({values, touched, errors, isSubmitting, handleChange, handleBlur }) => (
                <Form className='auth-boton'>

                  <Field id='email' type='email' name='email' placeholder='example@example.com'></Field>
                  {
                    errors.email && touched.email && (
                        <ErrorMessage name="email" component='div'></ErrorMessage>
                    )
                  }
                  <Field id='password' type='password' name='password' placeholder='Your password'></Field>
                  {
                    errors.password && touched.password && (
                        <ErrorMessage name="password" component='div'></ErrorMessage>
                    )
                  }
                  <button type='submit'>Log in</button>
                  {
                    isSubmitting ? (<p>Comprobando credenciales</p>) : null
                  }
                </Form>
              )
            }

        </Formik>
        <a href="https://github.com/pMoralesDev">Olvide mi contraseña</a>
            
    </div>
  </section>
  )
}
