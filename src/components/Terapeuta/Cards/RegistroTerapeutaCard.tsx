import { Card, CardContent, List, ListItem, ListItemText, Typography } from "@mui/material";
import { ICuestionario } from "../../../utils/Interfaces/back/ICuestionario.interface";

interface RegistrosCardProps {
  registro: ICuestionario;
}

const RegistroTerapeutaCard: React.FC<RegistrosCardProps> = ({ registro }) => {
    return (
      <Card sx={{ minWidth: 275, marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {registro.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Tipo: {registro.tipo}
        </Typography>
        <Typography variant="body2" component="p" style={{ marginTop: '20px' }}>
          Preguntas:
        </Typography>
        {registro.preguntas && registro.preguntas.length > 0 ? (
          <List>
            {registro.preguntas.map((pregunta, index) => (
              <ListItem key={index}>
                <ListItemText primary={pregunta.text} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" component="p">
            No hay preguntas disponibles.
          </Typography>
        )}
      </CardContent>
    </Card>
    );
};

export default RegistroTerapeutaCard;