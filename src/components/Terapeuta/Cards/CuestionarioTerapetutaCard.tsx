import { Button, Card, CardContent, List, ListItem, ListItemText, Typography, styled } from "@mui/material";
import { ICuestionario } from "../../../utils/Interfaces/back/ICuestionario.interface";
import { useContext, useEffect, useState } from "react";
import axiosConfig from "../../../utils/config/axios.config";
import { AuthContext } from "../../../utils/Interfaces/AuthInterface";
import { ITerapia } from "../../../utils/Interfaces/back/ITerapia.interface";
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { IUser } from "../../../utils/Interfaces/back/IUser.interface";


interface CuestionarioCardProps {
  cuestionario: ICuestionario;
}

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2)
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1)
}));


const CuestionarioTerapeutaCard: React.FC<CuestionarioCardProps> = ({ cuestionario }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user: authUser } = useContext(AuthContext);
  const [terapias, setTerapias] = useState<ITerapia[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTerapia, setSelectedTerapia] = useState<ITerapia>(terapias[0]);

  const loadData = async () => {
    try {
        const terapiasResponse = await axiosConfig.get(`/terapias/terapeuta?id=${authUser?.id}`); 
        setTerapias(terapiasResponse.data);
    } catch (error) {
        console.error('Error loading data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, [])  

  const handleAsignarCuestionario = async (cuestionario: ICuestionario, terapia: ITerapia) => {
      setIsLoading(true);
      try {
          await asignarCuestionario(cuestionario, terapia);

      } catch (error) {
          console.error('Error al asignar cuestionario:', error);
      } finally {
          setIsLoading(false);
      }
  };

  const asignarCuestionario = async (cuestionario: ICuestionario, terapia: ITerapia) => {
    try {
      // Paso 1: Crear una copia del cuestionario con modelo: false
      let preguntasObjectId: any[] = [];
      if(cuestionario.preguntas){
        preguntasObjectId = cuestionario.preguntas.map(pregunta => pregunta._id);
      }
      const cuestionarioCopia = { ...cuestionario, modelo: false, preguntas: preguntasObjectId };
      delete cuestionarioCopia._id;
  
      // Paso 2: Guardar la copia del cuestionario en la base de datos
      const response = await axiosConfig.post('/cuestionarios', cuestionarioCopia);
      const cuestionarioCreado = response.data;
      console.log(cuestionarioCreado);
  
      // Paso 3: Asignar el ID del cuestionario recién creado al paciente en la terapia
      terapia.registros.push(cuestionarioCreado._id);
  
      // Paso 4: Actualizar la terapia en la base de datos
      await axiosConfig.put(`/terapias?id=${terapia._id}`, terapia);
      loadData();
  
      console.log('Cuestionario asignado exitosamente');
    } catch (error) {
      console.error('Error al asignar cuestionario:', error);
    }
  };
    
    return (
      <Card raised>
      <StyledCardContent>
        <Typography variant="h5" component="h2">
          {cuestionario.name}
        </Typography>
        <Typography color="textSecondary">
          Tipo: {cuestionario.tipo}
        </Typography>
        <Typography variant="body2" component="p" style={{ marginTop: '20px' }}>
          Preguntas:
        </Typography>
        {cuestionario.preguntas && cuestionario.preguntas.length > 0 ? (
          <List>
            {cuestionario.preguntas.map((pregunta, index) => (
              <ListItem key={index}>
                <ListItemText primary={pregunta.text} secondary={`Tipo: ${pregunta.tipo}`} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" component="p">
            No hay preguntas disponibles.
          </Typography>
        )}
        <div style={{ textAlign: 'center' }}>
          <StyledButton variant="contained" color="primary" onClick={() => setOpenDialog(true)} disabled={isLoading}>
                  {isLoading ? 'Asignando...' : 'Asignar a un paciente'}
          </StyledButton>
        </div>
      </StyledCardContent>
      <Dialog open={openDialog} onClose={() => {setOpenDialog(false)}}>
        <DialogTitle>Seleccionar paciente</DialogTitle>
        <DialogContent>
            <List>
                {terapias.map((terapia) => {
                  const paciente : IUser = terapia.idPaciente as unknown as IUser
                  return (
                      <ListItem key={terapia._id} button onClick={() => setSelectedTerapia(terapia)}>
                          <ListItemText primary={paciente.name} />
                      </ListItem>
                )})}
            </List>
        </DialogContent>
          <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
              <Button
                  onClick={() => {
                      handleAsignarCuestionario(cuestionario, selectedTerapia);
                      setOpenDialog(false);
                  }}
                  color="primary"
                  disabled={!selectedTerapia || isLoading}
              >
                  Asignar
              </Button>
          </DialogActions>
      </Dialog>
    </Card>
    );
};

export default CuestionarioTerapeutaCard;


