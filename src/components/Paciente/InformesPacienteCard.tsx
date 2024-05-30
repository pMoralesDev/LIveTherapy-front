import { Card, CardContent, Typography } from "@mui/material";
import { ICita } from "../../utils/Interfaces/back/ICita.interface";


interface InformePacienteCardProps {
    citas: ICita;
}

const InforemesPacienteCard: React.FC<InformePacienteCardProps> = ({ citas }) => {

    const dateObj = new Date(citas.date);
    const formattedDate = dateObj.toLocaleDateString('es-ES', {
        month: 'long',
        day: 'numeric',
    });

    return (
        <Card style={{ marginBottom: 20 }}>
            <CardContent>
                <Typography variant="h5">{formattedDate}</Typography>
                <Typography style={{marginTop: '20px'}} color="textSecondary">{citas.informe}</Typography>
            </CardContent>
        </Card>
    );
};

export default InforemesPacienteCard;