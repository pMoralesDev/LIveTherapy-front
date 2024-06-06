import React, { useEffect, useState } from 'react'
import axiosConfig from '../../../utils/config/axios.config';
import { ITerapia } from '../../../utils/Interfaces/back/ITerapia.interface';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { IUser, UserRoles } from '../../../utils/Interfaces/back/IUser.interface';
import { Margin } from '@mui/icons-material';

export default function AdminTerapiasTable() {
  const [terapias, setTerapias] = useState<ITerapia[]>([]);
  const [selectedTerapia, setSelectedTerapia] = useState<ITerapia>({idTerapeuta: 'default', idPaciente: 'default', citas: [], registros:[], chat:[]});
  const [usuarios, setUsuarios] = useState<IUser[]>([]);
  const [isNewTerapia, setIsNewTerapia] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState<IUser>({});
  const [selectedTerapeuta, setSelectedTerapeuta] = useState<IUser>({});

  const loadTerapias = async () => {
    try {
        const response = await axiosConfig.get('/terapias');
        setTerapias(response.data);
    } catch (error) {
        console.error('Error loading users:', error);
    }
};

  useEffect(() => {
      const fetchData = async () => {
          try {
              loadTerapias();
              const response = await axiosConfig.get('/users');
              setUsuarios(response.data)
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };

      fetchData();
  }, []);

  const handleOpenDialog = (terapia?: ITerapia) => {
    if (terapia) {
        setSelectedTerapia(terapia);
        setIsNewTerapia(false);
    } else {
        setSelectedTerapia({idTerapeuta: 'default', idPaciente: 'default', citas: [], registros:[], chat:[]});
        setIsNewTerapia(true);
    }
      setOpenDialog(true);
  };

  const handleDeleteTerapia = async (terapiaId: string) => {
      // Lógica para eliminar la terapia
      try{
        await axiosConfig.delete(`/terapias?id=${terapiaId}`);
        console.log(`Borrada terapia con id: ${terapiaId}`);
        loadTerapias();
      }catch(e) {
        console.error(`error al borrar terapia`)
      }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveTerapia = async () => {
    try {
        if (isNewTerapia) {
            const nuevaTerapia = {
                idTerapeuta: selectedTerapeuta._id,
                idPaciente: selectedPaciente._id,
                citas: [],
                registros: [],
                chat: [],
              };    
            await axiosConfig.post('/terapias', nuevaTerapia);
        } else {
            await axiosConfig.put(`/terapias?id=${selectedTerapia._id}`, selectedTerapia);
        }
        loadTerapias();
        handleCloseDialog();
    } catch (error) {
        console.error('Error saving user:', error);
    }
      
  };

  const handleChangePaciente = (event: SelectChangeEvent<string>) => {
    const pacienteId = event.target.value as string;
    const selectedPaciente = usuarios.find(usuario => usuario._id === pacienteId);
    setSelectedPaciente(selectedPaciente || {});
  };
  
  const handleChangeTerapeuta = (event: SelectChangeEvent<string>) => {
    const terapeutaId = event.target.value as string;
    const selectedTerapeuta = usuarios.find(usuario => usuario._id === terapeutaId);
    setSelectedTerapeuta(selectedTerapeuta || {});
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
                          <TableCell>{terapia.citas ? terapia.citas.length : 0}</TableCell>
                          <TableCell>{terapia.registros ? terapia.registros.length : 0}</TableCell>
                          <TableCell>{terapia.chat ? terapia.chat.length : 0}</TableCell>
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
      <Button variant="contained" color="primary" style={{marginBottom:'1rem'}}
                onClick={() => handleOpenDialog()}>Add Terapia</Button>
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>{isNewTerapia ? 'Add Terapia' : 'Update Terapia'}</DialogTitle>
          <DialogContent>
          <form>
      <FormControl fullWidth style={{marginBottom: '2rem', marginTop: '2rem'}}>
        <InputLabel id="terapeuta-label" style={{color:'#000', marginTop:'-1rem'}}>Terapeuta</InputLabel>
        <Select value={selectedTerapeuta._id || 'default'} onChange={handleChangeTerapeuta}>
            {usuarios.filter(usuario => usuario.role === UserRoles.THERAPIST).map(terapeuta => (
                <MenuItem key={terapeuta._id} value={terapeuta._id}>
                {terapeuta.name}
                </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="paciente-label" style={{color:'#000', marginTop:'-1rem'}}>Paciente</InputLabel>
        <Select value={selectedPaciente._id || 'default'} onChange={handleChangePaciente}>
            {usuarios.filter(usuario => usuario.role === UserRoles.PATIENT).map(paciente => (
                <MenuItem key={paciente._id} value={paciente._id}>
                {paciente.name}
                </MenuItem>
            ))}
        </Select>
      </FormControl>
    </form>
          </DialogContent>
          <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={handleSaveTerapia}>Save</Button>
          </DialogActions>
      </Dialog>
    </>
  );
};