import { Card, CardContent, Typography } from "@mui/material";
import { ICuestionario } from "../../../utils/Interfaces/back/ICuestionario.interface";

const RegstroTerapeutaCard: React.FC<ICuestionario> = ({ _id, name, modelo, tipo, preguntas, respuestas }) => {
    return (
      <Card sx={{ minWidth: 275, marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Tipo: {tipo}
        </Typography>
        <Typography variant="body2">
          Modelo: {modelo ? 'Sí' : 'No'}
          <br />
          Preguntas: {4}
          <br />
          Respuestas: {5}
        </Typography>
      </CardContent>
    </Card>
    );
};

export default RegstroTerapeutaCard;