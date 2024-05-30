import { Card, CardContent, Typography } from "@mui/material";
import { ICita } from "../utils/Interfaces/back/ICita.interface";

interface CitasCardProps {
    citas: ICita;
}

const CitasCard: React.FC<CitasCardProps> = ({ citas }) => {

    const dateObj = new Date(citas.date);
    const formattedDate = dateObj.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <Card style={{ marginBottom: 20 }}>
            <CardContent>
                <Typography variant="h5">{formattedDate}</Typography>
                {/* <Typography color="textSecondary">{citas.acude ? 'Acude' : 'No Acude'}</Typography>
                <Typography color="textSecondary">{citas.informe}</Typography> */}
            </CardContent>
        </Card>
    );
};

export default CitasCard;