import React, { useContext, useEffect, useState } from 'react';
import { ICuestionario } from '../../utils/Interfaces/back/ICuestionario.interface';
import axiosConfig from '../../utils/config/axios.config';
import { Container, CssBaseline, Grid, Typography } from '@mui/material';
import CuestionarioPacienteCard from './Cards/CuestionarioPacienteCard';
import { AuthContext } from '../../utils/Interfaces/AuthInterface';

const PacienteCuestionarios: React.FC = () => {
  const [cuestionarios, setCuestionarios] = useState<ICuestionario[]>([]);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    const fetchCuestionarios = async () => {
      try {
        const response = await axiosConfig.get(`/cuestionarios/paciente?id=${user?.id}`);
        setCuestionarios(response.data);
      } catch (error) {
        console.error('Error fetching cuestionarios:', error);
      }
    };

    fetchCuestionarios();
  }, []);

  return (
    <>
      <CssBaseline />
      <Container style={{alignItems: 'center'}}>
        <Typography variant="h4" component="h1" gutterBottom style={{marginLeft: '33rem'}}>
          Tus Cuestionarios
        </Typography>
        <Grid container spacing={2}>
          {cuestionarios.map((cuestionario) => (
            <Grid item xs={12} sm={6} md={4} key={cuestionario._id}>
              <CuestionarioPacienteCard  key={cuestionario._id} cuestionario={cuestionario} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default PacienteCuestionarios;