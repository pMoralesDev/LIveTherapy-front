import React from 'react'
import '../../../styles/authPage.css'
import { FaGoogle, FaGithub, FaLinkedin } from 'react-icons/fa';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AxiosResponse } from 'axios';
import { register } from '../../../service/authService';

export default function RegisterForm() {

  const registerSchema = Yup.object().shape({
    name: Yup.string().required(''),
    role: Yup.string().required(''),
    email: Yup.string().email('Formato de email no valido').required(''),
    password: Yup.string().min(6, 'como minimo debe tener 6 caracteres').required(''),
    age: Yup.number().min(0, 'La edad no puede ser negativa').max(118, 'La persona más longeva del mundo vivió 117 años y 78 días').required(''),
    phone: Yup.string().required('')
  })

  const initialValues = {
    name:'',
    role:'patient',
    email:'',
    password:'',
    age:18,
    phone:''
  }

  return (
    <section className='form-container sign-up'>
      <div className='sub-container'>
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
        <Formik initialValues={initialValues} validationSchema={registerSchema}
          onSubmit={ async(values) => {
            await register(values.name, values.email, values.role, values.password, values.age, values.phone).then((res:AxiosResponse) => {
              if(res.status === 201){
                alert('Usuario creado, ya puede logearse')            
              }else if(res.status === 400){
                alert('Este usuario ya existe')
              }else if(res.status === 500){
                alert('Error en el servidor')
              }else{ throw new Error('Error en el servidor')}
            }).catch((err)=> {
              console.error(`[REGISTER ERROR] Error al intentar registrar usuario ${err}`)})
          }}>
            {
              ({values, touched, errors, isSubmitting, handleChange, handleBlur }) => (
                <Form className='auth-boton'>

                  <Field id='name' type='name' name='name' placeholder='Nombre'></Field>
                  {
                    errors.email && touched.email && (
                        <ErrorMessage name="name" component='div'></ErrorMessage>
                    )
                  }
                  <Field id='emailRegister' type='email' name='email' placeholder='example@example.com'></Field>
                  {
                    errors.email && touched.email && (
                        <ErrorMessage name="email" component='div'></ErrorMessage>
                    )
                  }
                  <Field id='passwordRegister' type='password' name='password' placeholder='Your password'></Field>
                  {
                    errors.password && touched.password && (
                        <ErrorMessage name="password" component='div'></ErrorMessage>
                    )
                  }
                  <Field id='age' type='number' name='age'></Field>
                  {
                    errors.password && touched.password && (
                        <ErrorMessage name="age" component='div'></ErrorMessage>
                    )
                  }
                  <Field id='phone' type='string' name='phone' placeholder='Teléfono de contacto'></Field>
                  {
                    errors.password && touched.password && (
                        <ErrorMessage name="phone" component='div'></ErrorMessage>
                    )
                  }
                  <button type='submit'>Registrar</button>
                  {
                    isSubmitting ? (<p>Comprobando credenciales</p>) : null
                  }
                </Form>
              )
            }
        </Formik>
      </div>
    </section>
  )
}
