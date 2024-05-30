import React, { useState } from 'react';
import { CssBaseline, Container, Grid } from '@mui/material';
import PacienteSidebar from '../components/Paciente/PacienteSidebar';
import PacienteCuestionarios from '../components/Paciente/PacienteCuestionarios';
import PacienteInformes from '../components/Paciente/PacienteInformes';
import PacienteCitas from '../components/Paciente/PacienteCitas';
import UserConfiguracion from '../components/UserConfiguration';
import CustomHeader from '../components/Header';

const PacientePage: React.FC = () => {

  const [currentPage, setCurrentPage] = useState<string>('cuestionarios');

  const renderPage = () => {
    switch (currentPage) {
      case 'cuestionarios':
        return <PacienteCuestionarios />;
      case 'informes':
        return <PacienteInformes />;
      case 'mis-citas':
        return <PacienteCitas />;
      case 'configuracion':
        return <UserConfiguracion />;
      default:
        return <PacienteCuestionarios />;
    }
  };

  return (
    <>
      <CssBaseline />
      <Grid container direction="column">
        <Grid item xs={12}>
          <CustomHeader />
        </Grid>
        <Grid item container style={{ flexWrap: 'nowrap' }}>
          <Grid item xs={1} >
            <PacienteSidebar setCurrentPage={setCurrentPage} />
          </Grid>
          <Grid item xs={11}>
            <Container component="main" style={{ marginTop: '2rem', marginLeft: '3rem', marginRight:'2rem' }}>
              {renderPage()}
            </Container>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default PacientePage;