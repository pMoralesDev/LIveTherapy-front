import React, { useEffect, useState } from 'react'
import { ICita } from '../../../utils/Interfaces/back/ICita.interface';
import { ITerapia } from '../../../utils/Interfaces/back/ITerapia.interface';
import axiosConfig from '../../../utils/config/axios.config';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { IUser } from '../../../utils/Interfaces/back/IUser.interface';

export default function AdminCitasTable() {
    const [terapias, setTerapias] = useState<ITerapia[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedCita, setSelectedCita] = useState<ICita>({ date: new Date(), acude: false, informe: '', terapeuta: '', paciente: '' });
    const [isNewCita, setIsNewCita] = useState(false);


    const loadData = async () => {
        try {
            const terapiasResponse = await axiosConfig.get('/terapias'); 
            setTerapias(terapiasResponse.data);
        } catch (error) {
            console.error('Error loading data:', error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // Función para abrir el diálogo y seleccionar la cita a actualizar o agregar una nueva
    const handleOpenDialog = (cita?: ICita) => {
        if (cita) {
            setSelectedCita(cita);
            setIsNewCita(false);
        } else {
            setSelectedCita({ date: new Date(), acude: false, informe: '', terapeuta: '', paciente: '' });
            setIsNewCita(true);
        }
        setOpenDialog(true);
    };

    // Función para cerrar el diálogo
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    // Función para guardar una cita (nueva o actualizada)
    const handleSaveCita = async () => {
        try {
            if (isNewCita) {
                await axiosConfig.post('/terapias/citas', selectedCita); 
            } else {
                await axiosConfig.put(`/terapias/citas${selectedCita._id}`, selectedCita); 
            }
            loadData(); 
            handleCloseDialog(); 
        } catch (error) {
            console.error('Error saving cita:', error);
        }
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Terapeuta</TableCell>
                            <TableCell>Paciente</TableCell>
                            <TableCell>Informe</TableCell>
                            <TableCell>Asistencia</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {terapias.map(terapia => (
                        <React.Fragment key={terapia._id}>
                            {terapia.citas.map(citaId => {
                                const cita : ICita = citaId as unknown as ICita;
                                const terapeuta : IUser = terapia.idTerapeuta as unknown as IUser
                                const paciente : IUser = terapia.idPaciente as unknown as IUser
                                if (cita) {
                                    
                                    return (
                                        <TableRow key={cita._id}>
                                            <TableCell>{new Date(cita.date).toLocaleString()}</TableCell>
                                            <TableCell>{terapeuta.name}</TableCell>
                                            <TableCell>{paciente.name}</TableCell>
                                            <TableCell>{cita.informe}</TableCell>
                                            <TableCell>{cita.acude ? 'Acude' : 'No Acude'}</TableCell>
                                            <TableCell>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <Button variant="contained" color="primary" style={{marginRight:'1rem'}}
                                                    onClick={() => handleOpenDialog(cita)}>Update</Button>
                                                <Button variant="contained" color="secondary" onClick={() => handleOpenDialog(cita)}>Delete</Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                } else {
                                    return null;
                                }
                            })}
                        </React.Fragment>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2, marginRight: 2 }}>
                <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>Add Cita</Button>
            </Box>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{isNewCita ? 'Add Cita' : 'Update Cita'}</DialogTitle>
                <DialogContent>
                    {/* Aquí colocas los campos del formulario para agregar o actualizar la cita */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleSaveCita}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
