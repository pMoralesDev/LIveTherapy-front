import { Container, CssBaseline, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Cuestionario } from '../../utils/Interfaces/Cuestionarios.interface';
import axiosConfig from '../../utils/config/axios.config';
import CuestionarioTerapeutaCard from './Cards/CuestionarioTerapetutaCard';

const TerapeutaCuestionarios: React.FC = () => {

  const [cuestionarios, setCuestionarios] = useState<Cuestionario[]>([]);

  useEffect(() => {
    const fetchCuestionarios = async () => {
      try {
        const response = await axiosConfig.get('/cuestionarios');
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
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Cuestionarios
        </Typography>
        <Grid container spacing={2}>
          {cuestionarios.map((cuestionario) => (
            <Grid item xs={12} sm={6} md={4} key={cuestionario._id}>
              <CuestionarioTerapeutaCard {...cuestionario} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default TerapeutaCuestionarios;