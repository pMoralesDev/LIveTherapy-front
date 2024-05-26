import React, { useContext, useEffect, useState } from 'react';
import axiosConfig from '../../utils/config/axios.config';
import { Container, CssBaseline, Grid, Typography } from '@mui/material';
import RegstroTerapeutaCard from './Cards/RegistroTerapeutaCard';
import { Registro } from '../../utils/Interfaces/Registros.interface';
import { Terapia } from '../../utils/Interfaces/Terapia.interface';
import { AuthContext } from '../../utils/Interfaces/AuthInterface';

const TerapeutaRegistros: React.FC = () => {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchRegistros = async () => {
      if (!user) {
        return;
      }

      try {
        const response = await axiosConfig.get('/terapias');
        const terapias: Terapia[] = response.data;
        const registrosFiltrados = terapias
          .filter((terapia) => terapia.idTerapeuta === String(user))
          .flatMap((terapia) => terapia.registros);
        setRegistros(registrosFiltrados);
      } catch (error) {
        console.error('Error fetching registros:', error);
      }
    };

    if (user) {
      fetchRegistros();
    }
  }, [user]);

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