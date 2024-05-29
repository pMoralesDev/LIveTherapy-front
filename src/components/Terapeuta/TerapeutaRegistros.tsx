import React, { useEffect, useState } from 'react';
import { Container, CssBaseline, Grid, Typography } from '@mui/material';
import RegstroTerapeutaCard from './Cards/RegistroTerapeutaCard';
import { fetchCuestionariosForUser } from '../../service/terapeutasService';
import { ICuestionario } from '../../utils/Interfaces/back/ICuestionario.interface';


const TerapeutaRegistros: React.FC = () => {
  const [registros, setRegistros] = useState<ICuestionario[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      let token = localStorage.getItem('token');
      if (token) {
        const registros = await fetchCuestionariosForUser( token); 
        setRegistros(registros);
        console.log(`${registros}`);
      } else {
        console.log('No se encuenta el token del usuario');
      }
    };

    fetchData();
  });

  return (
    <>
      <CssBaseline />
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Registros
        </Typography>
        <Grid container spacing={2}>
          {registros.map((registro) => (
            <Grid item xs={12} sm={6} md={4} key={registro._id}>
              <RegstroTerapeutaCard {...registro} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default TerapeutaRegistros;