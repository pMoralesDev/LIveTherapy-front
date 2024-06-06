import { useContext, useEffect, useState } from "react";
import axiosConfig from "../utils/config/axios.config";
import CitasCard from "./CitasCard";
import { AuthContext } from "../utils/Interfaces/AuthInterface";
import { ICita } from "../utils/Interfaces/back/ICita.interface";
import { Button } from "@mui/material";


const Citas = () => {
    const [citas, setCitas] = useState<ICita[]>([]);
    const { user: authUser } = useContext(AuthContext);

    useEffect(() => {
        if (authUser){
            if (authUser.role === 'terapeuta'){
                axiosConfig.get(`/terapias/citas/terapeuta?id=${authUser.id}`)
                .then(response => {
                    setCitas(response.data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
            } if (authUser.role === 'paciente') {
                axiosConfig.get(`/terapias/citas/paciente?id=${authUser.id}`)
                .then(response => {
                    setCitas(response.data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
            }
        }
        
    }, [authUser]);

    return (
        <div>
            {citas.map(cita => (
                <CitasCard key={cita._id} citas={cita} />
            ))}
            {authUser?.role === 'terapeuta' && (
                <Button variant="contained" color="primary">Asignar Cita</Button>
            )}
        </div>
    );
}

export default Citas;