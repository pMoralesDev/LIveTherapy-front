import React, { useState } from 'react';
import { CssBaseline, Container, Grid } from '@mui/material';

import TerapeutaSidebar from '../components/Terapeuta/TerapeutaSidebar';
import TerapeutaCuestionarios from '../components/Terapeuta/Terapeuta cuestionarios';
import TerapeutaRegistros from '../components/Terapeuta/TerapeutaRegistros';
import TerapeutaInformes from '../components/Terapeuta/TerapeutaInformes';
import TerapeutaPacientes from '../components/Terapeuta/TerapeutaPacientes';
import UserConfiguracion from '../components/UserConfiguration';
import CustomHeader from '../components/Header';
import Citas from '../components/Citas';


const TerapeutaPage: React.FC = () => {

  const [currentPage, setCurrentPage] = useState<string>('cuestionarios');

  const renderPage = () => {
    switch (currentPage) {
      case 'cuestionarios':
        return <TerapeutaCuestionarios />;
      case 'registros':
        return <TerapeutaRegistros />;
      case 'informes':
        return <TerapeutaInformes />;
      case 'pacientes':
        return <TerapeutaPacientes />;
      case 'agenda':
        return <Citas />;
      case 'configuracion':
        return <UserConfiguracion />;
      default:
        return <TerapeutaCuestionarios />;
    }
  };

  return (
    <>
      <CssBaseline />
      <Grid container direction="column">
        <Grid item>
          <CustomHeader />
        </Grid>
        <Grid item container>
          <Grid item>
            <TerapeutaSidebar setCurrentPage={setCurrentPage} />
          </Grid>
          <Grid item xs>
            <Container component="main" style={{ marginTop: '2rem', marginLeft: '2rem', marginRight:'2rem' }}>
              {renderPage()}
            </Container>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default TerapeutaPage;
