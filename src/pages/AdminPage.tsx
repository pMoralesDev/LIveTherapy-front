import React, { useState } from 'react';
import { Container } from '@mui/material';
import AdminHeader from '../components/Admin/AdminHeader';
import AdminUserTable from '../components/Admin/Tables/AdminUserTable';
import AdminTerapiasTable from '../components/Admin/Tables/AdminTerapiasTable';
import AdminCuestionariosTable from '../components/Admin/Tables/AdminCuestionariosTable';
import AdminPreguntasTable from '../components/Admin/Tables/AdminPreguntasTable';
import AdminCitasTable from '../components/Admin/Tables/AdminCitasTable';


const AdminDashboard: React.FC = () => {
  const [currentTable, setCurrentTable] = useState<string>('usuarios');

  const renderDataTable = () => {
    switch (currentTable) {

      case 'usuarios':
        return <AdminUserTable/>;
      
      case 'terapias':
        return <AdminTerapiasTable/>;

      case 'cuestionarios':
        return <AdminCuestionariosTable/>;

      case 'preguntas':
        return <AdminPreguntasTable/>;

      case 'citas':
        return <AdminCitasTable/>;

      default:
        return <AdminUserTable/>;
    }
  }

  return (
    <div>
      <AdminHeader onSelectTable={setCurrentTable} />
      <Container>
        {renderDataTable()}
      </Container>
    </div>
  );
};

export default AdminDashboard;
