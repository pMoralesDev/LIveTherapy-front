import React, { useContext, useEffect, useState } from 'react';
import { Container, CssBaseline, Grid, Typography } from '@mui/material';
import { ICuestionario } from '../../utils/Interfaces/back/ICuestionario.interface';
import { AuthContext } from '../../utils/Interfaces/AuthInterface';
import axiosConfig from '../../utils/config/axios.config';
import RegistroTerapeutaCard from './Cards/RegistroTerapeutaCard';


const TerapeutaRegistros: React.FC = () => {
  const [registros, setRegistros] = useState<ICuestionario[]>([]);
  const { user: authUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      if(authUser){
      try {
        const response = await axiosConfig.get(`/cuestionarios/terapeuta?id=${authUser.id}`);
        setRegistros(response.data);
      } catch (error) {
        console.error('Error fetching cuestionarios:', error);
      }}
    };

    fetchData();
  });

  return (
    <>
      <CssBaseline />
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Mis registros asignados
        </Typography>
        <Grid container spacing={2}>
          {registros.map((registro) => (
            <Grid item xs={12} sm={6} md={4} key={registro._id}>
              <RegistroTerapeutaCard registro={registro}/>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default TerapeutaRegistros;