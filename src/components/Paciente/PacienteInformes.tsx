import React, { useContext, useEffect, useState } from 'react';
import { ICita } from '../../utils/Interfaces/back/ICita.interface';
import { AuthContext } from '../../utils/Interfaces/AuthInterface';
import axiosConfig from '../../utils/config/axios.config';
import InforemesPacienteCard from './InformesPacienteCard';

const PacienteInformes: React.FC = () => {
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
                <InforemesPacienteCard key={cita._id} citas={cita} />
            ))}
        </div>
    );
};

export default PacienteInformes;