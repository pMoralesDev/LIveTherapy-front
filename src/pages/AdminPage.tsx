import React, { useEffect, useState } from 'react';

import { Container } from '@mui/material';
import AdminHeader from '../components/Admin/AdminHeader';
import AdminDataTable from '../components/Admin/AdimTables';
import axiosConfig from '../utils/config/axios.config';
import { tables } from '../utils/Interfaces/TablesAdmin.Interface';
import { addNewItem, deleteItem, getNewRowTemplate, updateItem } from '../service/adminService';


const AdminDashboard: React.FC = () => {
  const [data, setData] = useState<{ [key: string]: any }[]>([]);
  const [currentTable, setCurrentTable] = useState<string>('usuarios');

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosConfig.get(tables[currentTable].apiEndpoint);
        console.log(response.data)
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [currentTable]);

  const handleUpdate = () => {
    //TODO: pendiente implementar => definir un formulario, caputar los datos, enviar los datos, actualizar el estado local, manejar errores. 
    // setData(updateItem(id, data, apiEndpoint));
  };

  const handleDelete = (id: number) => {
    setData(deleteItem(data, id));
  };

  const handleAddNew = () => {
    const newRow = getNewRowTemplate(currentTable);
    setData(addNewItem(data, newRow));
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
