import React, { useEffect, useState } from 'react'
import { ICuestionario } from '../../../utils/Interfaces/back/ICuestionario.interface';
import axiosConfig from '../../../utils/config/axios.config';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export default function AdminCuestionariosTable() {
  const [cuestionarios, setCuestionarios] = useState<ICuestionario[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosConfig.get('/cuestionarios'); 
                setCuestionarios(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleOpenDialog = (cuestionario: ICuestionario) => {
        // Lógica para abrir el diálogo de actualización
    };

    const handleDeleteCuestionario = (cuestionarioId: string) => {
        // Lógica para eliminar el cuestionario
    };

    return (
      <>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell>Modelo</TableCell>
                        <TableCell>Preguntas</TableCell>
                        <TableCell>Respuestas</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cuestionarios.map(cuestionario => (
                        <TableRow key={cuestionario._id}>
                            <TableCell>{cuestionario.name}</TableCell>
                            <TableCell>{cuestionario.tipo}</TableCell>
                            <TableCell>{cuestionario.modelo ? 'Sí' : 'No'}</TableCell>
                            <TableCell>{cuestionario.preguntas?.length || 0}</TableCell>
                            <TableCell>{cuestionario.respuestas?.length || 0}</TableCell>
                            <TableCell>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Button variant="contained" color="primary" style={{ marginRight: '1rem' }} onClick={() => handleOpenDialog(cuestionario)}>Update</Button>
                                    <Button variant="contained" color="secondary" onClick={() => { if (cuestionario._id) { handleDeleteCuestionario(cuestionario._id) } }}>Delete</Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2, marginRight: 2 }}>
        <Button variant="contained" color="primary">Add Cuestionario</Button>
        </Box>
      </>
    );
};
