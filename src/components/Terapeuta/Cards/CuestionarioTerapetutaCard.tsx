import { Card, CardContent, Typography } from "@mui/material";
import { Cuestionario } from "../../../utils/Interfaces/Cuestionarios.interface";

const CuestionarioTerapeutaCard: React.FC<Cuestionario> = ({ _id, name, modelo, tipo, preguntas, respuestas }) => {
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
            Preguntas: {preguntas.length}
            <br />
            Respuestas: {respuestas.length}
          </Typography>
        </CardContent>
      </Card>
    );
};

export default CuestionarioTerapeutaCard;
  