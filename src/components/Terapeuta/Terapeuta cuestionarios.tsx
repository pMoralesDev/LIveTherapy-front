import { Button, Container, CssBaseline, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axiosConfig from '../../utils/config/axios.config';
import CuestionarioTerapeutaCard from './Cards/CuestionarioTerapetutaCard';
import { ICuestionario } from '../../utils/Interfaces/back/ICuestionario.interface';

const TerapeutaCuestionarios: React.FC = () => {

  const [cuestionarios, setCuestionarios] = useState<ICuestionario[]>([]);

  useEffect(() => {
    const fetchCuestionarios = async () => {
      try {
        const response = await axiosConfig.get('/cuestionarios/modelos');
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
        <Button variant="contained" color="primary" style={{marginBottom: '20px'}}>
          Crear cuestionario personalizado
        </Button>
        <Grid container spacing={2}>
          {cuestionarios.map((cuestionario) => (
            <Grid item xs={12} sm={6} md={4} key={cuestionario._id}>
              <CuestionarioTerapeutaCard  key={cuestionario._id} cuestionario={cuestionario} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default TerapeutaCuestionarios;