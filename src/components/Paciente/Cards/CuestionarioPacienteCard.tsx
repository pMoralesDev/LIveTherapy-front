import { ICuestionario } from "../../../utils/Interfaces/back/ICuestionario.interface";
import { Button, Card, CardContent, List, ListItem, ListItemText, Typography, styled } from "@mui/material";


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
  
  
  const CuestionarioPacienteCard: React.FC<CuestionarioCardProps> = ({ cuestionario }) => {
      return (
        <Card raised>
        <StyledCardContent>
          <Typography variant="h5" component="h2">
            {cuestionario.name}
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
          <StyledButton variant="contained" color="primary">
            Responder preguntas
          </StyledButton>
          </div>
        </StyledCardContent>
        </Card>
      );
  };
  
  export default CuestionarioPacienteCard;