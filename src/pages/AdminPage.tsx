import React, { useEffect, useState } from 'react';

import { Container } from '@mui/material';
import AdminHeader from '../components/Admin/AdminHeader';
import AdminDataTable from '../components/Admin/AdimTables';
import axiosConfig from '../utils/config/axios.config';
import { tables, TableConfig } from '../utils/Interfaces/TablesAdmin.Interface';


const AdminDashboard: React.FC = () => {
  const [data, setData] = useState<{ [key: string]: any }[]>([]);
  const [currentTable, setCurrentTable] = useState<string>('usuarios');

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosConfig.get(tables[currentTable].apiEndpoint);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [currentTable]);

  const handleUpdate = (id: number) => {
    // Lógica de actualización
    console.log('Update row with id:', id);
  };

  const handleDelete = (id: number) => {
    // Lógica de eliminación
    setData(data.filter(row => row.id !== id));
  };

  const handleAddNew = () => {
    // Lógica para agregar un nuevo elemento
    const newId = data.length ? data[data.length - 1].id + 1 : 1;
    setData([...data, { id: newId, ...getNewRowTemplate(currentTable) }]);
  };

  const getNewRowTemplate = (table: string) => {
    switch (table) {
      case 'usuarios':
        return { _id: '', role: '', name: '', email: '', password: '', age: 0, phone: '' };
      case 'terapias':
        return { name: '', idTerapeuta: '', idPaciente: '', citas: [], registros: [], chat: [] };
      case 'cuestionarios':
        return { _id: '', name: '', modelo: false, tipo: '', preguntas: [], respuestas: [] };
      case 'preguntas':
        return { _id: '', name: '', text: '', tipo: '' };
      case 'citas':
        return { _id: '', date: new Date(), acude: true, informe: '' };
      default:
        return {};
    }
  };

  return (
    <div>
      <AdminHeader onSelectTable={setCurrentTable} />
      <Container>
        <AdminDataTable
          key={currentTable}
          columns={tables[currentTable].columns}
          data={data}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onAddNew={handleAddNew}
        />
      </Container>
    </div>
  );
};

export default AdminDashboard;
