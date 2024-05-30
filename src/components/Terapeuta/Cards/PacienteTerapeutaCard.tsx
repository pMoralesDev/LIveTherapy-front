import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { IUser } from "../../../utils/Interfaces/back/IUser.interface";

interface TerapeutaPacientesProps {
    pacientes: IUser[];
}

const PacienteTerapeutaCard: React.FC<TerapeutaPacientesProps> = ({ pacientes }) => {
    return (
        <Grid container spacing={2}>
            {pacientes.map((paciente) => (
                <Grid item xs={12} sm={6} md={4} key={paciente._id}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {paciente.name}
                            </Typography>
                            <Typography color="textSecondary">
                                Email: {paciente.email}
                            </Typography>
                            <Typography color="textSecondary">
                                Edad: {paciente.age}
                            </Typography>
                            <Typography color="textSecondary">
                                Telefono: {paciente.phone}
                            </Typography>
                            <Button variant="contained" color="primary" style={{ marginTop: 16 }}>
                                Ver Terapias
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default PacienteTerapeutaCard;