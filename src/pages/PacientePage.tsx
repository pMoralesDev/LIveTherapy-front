import React, { useState } from 'react';
import { CssBaseline, Container, Grid } from '@mui/material';
import PacienteHeader from '../components/Paciente/PacienteHeader';
import PacienteSidebar from '../components/Paciente/PacienteSidebar';
import PacienteCuestionarios from '../components/Paciente/PacienteCuestionarios';
import PacienteInformes from '../components/Paciente/PacienteInformes';
import PacienteCitas from '../components/Paciente/PacienteCitas';
import PacienteConfiguracion from '../components/Paciente/PacienteConfiguracion';

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
        return <PacienteConfiguracion />;
      default:
        return <PacienteCuestionarios />;
    }
  };

  return (
    <>
      <CssBaseline />
      <Grid container direction="column">
        <Grid item>
          <PacienteHeader />
        </Grid>
        <Grid item container>
          <Grid item>
            <PacienteSidebar setCurrentPage={setCurrentPage} />
          </Grid>
          <Grid item xs>
            <Container component="main" style={{ marginTop: '64px' }}>
              {renderPage()}
            </Container>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default PacientePage;