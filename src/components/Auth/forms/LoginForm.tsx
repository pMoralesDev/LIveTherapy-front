import React, { useContext } from 'react';
import { FaGoogle, FaGithub, FaLinkedin } from 'react-icons/fa';
import '../../../styles/authPage.css'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login } from '../../../service/authService';
import { AxiosResponse } from 'axios';
import { AuthContext, AuthUser } from '../../../utils/Interfaces/AuthInterface';
import {useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// Definimos el schema de validacion con yup
const loginSchema = Yup.object().shape({
  email: Yup.string().email('Formato de email no valido').required(''),
  password: Yup.string().required('')
});

const initialCredentials = {
  email: '',
  password: ''
};

const LoginForm: React.FC = () => {
  const { login: authLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <section className="form-container sign-in" style={ {transform: 'translateX(100%)'}}>
      <div className="sub-container">
        <h1>Login</h1>
        <div className="social-icons">
          <a href="https://github.com/pMoralesDev" className="icon">
            <FaGoogle />
          </a>
          <a href="https://github.com/pMoralesDev" className="icon">
            <FaGithub />
          </a>
          <a href="https://github.com/pMoralesDev" className="icon">
            <FaLinkedin />
          </a>
        </div>
        <span>Conectate con tu email</span>
        <Formik
          initialValues={initialCredentials}
          validationSchema={loginSchema}
          onSubmit={async (values) => {
            try {
              const res: AxiosResponse = await login(values.email, values.password);
              if (res.status === 200) {
                if (res.data.token) {
                  sessionStorage.setItem('sessionToken', res.data.token);
                  authLogin(res.data.token);
                  const decoded: AuthUser = jwtDecode(res.data.token);
                  console.log(decoded.role);
                  if (decoded.role === 'admin') {
                    navigate('/admin');
                  } else if (decoded.role === 'terapeuta') {
                    navigate('/terapeuta');
                  } else if (decoded) {
                    navigate('/paciente');
                  }
                } else {
                  throw new Error('No se ha recibido token de acceso');
                }
              } else {
                throw new Error('Error en el servidor');
              }
            } catch (err) {
              console.error(`[LOGIN ERROR] Error al intentar iniciar sesión: ${err}`);
            }
          }}
        >
          {({ touched, errors, isSubmitting }) => (
            <Form className="auth-boton">
              <Field id="email" type="email" name="email" placeholder="example@example.com" />
              {errors.email && touched.email && <ErrorMessage name="email" component="div" />}
              <Field id="password" type="password" name="password" placeholder="Your password" />
              {errors.password && touched.password && <ErrorMessage name="password" component="div" />}
              <button type="submit">Login</button>
              {isSubmitting && <p>Comprobando credenciales</p>}
            </Form>
          )}
        </Formik>
        <a href="https://github.com/pMoralesDev">Olvide mi contraseña</a>
      </div>
    </section>
  );
};

export default LoginForm;