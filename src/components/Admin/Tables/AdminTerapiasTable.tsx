import React, { useEffect, useState } from 'react'
import axiosConfig from '../../../utils/config/axios.config';
import { ITerapia } from '../../../utils/Interfaces/back/ITerapia.interface';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { IUser } from '../../../utils/Interfaces/back/IUser.interface';

export default function AdminTerapiasTable() {
  const [terapias, setTerapias] = useState<ITerapia[]>([]);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axiosConfig.get('/terapias'); // Cambia la URL por la ruta de tu API
              setTerapias(response.data);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };

      fetchData();
  }, []);

  const handleOpenDialog = (terapia: ITerapia) => {
      // Lógica para abrir el diálogo de actualización
  };

  const handleDeleteTerapia = (terapiaId: string) => {
      // Lógica para eliminar la terapia
  };

  return (
    <>
      <TableContainer component={Paper}>
          <Table>
              <TableHead>
                  <TableRow>
                      <TableCell>Terapeuta</TableCell>
                      <TableCell>Paciente</TableCell>
                      <TableCell>Citas</TableCell>
                      <TableCell>Registros</TableCell>
                      <TableCell>Chat</TableCell>
                      <TableCell></TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {terapias.map(terapia => {
                     const terapeuta : IUser = terapia.idTerapeuta as unknown as IUser
                     const paciente : IUser = terapia.idPaciente as unknown as IUser
                    return (
                      <TableRow key={terapia._id}>
                          <TableCell>{terapeuta.name}</TableCell>
                          <TableCell>{paciente.name}</TableCell>
                          <TableCell>{terapia.citas.length}</TableCell>
                          <TableCell>{terapia.registros.length}</TableCell>
                          <TableCell>{terapia.chat.length}</TableCell>
                          <TableCell>
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                  <Button variant="contained" color="primary" style={{ marginRight: '1rem' }} onClick={() => handleOpenDialog(terapia)}>Update</Button>
                                  <Button variant="contained" color="secondary" onClick={() => { if (terapia._id) { handleDeleteTerapia(terapia._id) } }}>Delete</Button>
                              </div>
                          </TableCell>
                      </TableRow>
                    )})}
              </TableBody>
          </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2, marginRight: 2 }}>
                <Button variant="contained" color="primary">Add Terapia</Button>
      </Box>
    </>
  );
};