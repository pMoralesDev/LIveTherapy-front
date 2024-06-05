import { Card, CardContent, IconButton, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

interface informesCardProps {
    informe: any;
}

const InformesTerapeutaCard: React.FC<informesCardProps> = ({ informe }) => {

  const dateObj = new Date(informe.fechaInforme);

  const isValidDate = !isNaN(dateObj.getTime());
  const formattedDate = isValidDate ? dateObj.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit'
  }) : "Fecha no válida";

    return (
        <Card style={{ marginBottom: 20 }}>
            <CardContent>
                <Typography variant="h5">{informe.paciente ? informe.paciente.nombre : 'Paciente no disponible'}</Typography>
                <Typography color="textSecondary" >{formattedDate}</Typography>
                <Typography color="textSecondary">{informe.informe}</Typography>
                <IconButton>
                    <EditIcon/>
                </IconButton>
            </CardContent>
        </Card>
    );
};

export default InformesTerapeutaCard;