import React, { useContext, useEffect, useState } from 'react';
import axiosConfig from '../../utils/config/axios.config';
import PacienteTerapeutaCard from './Cards/PacienteTerapeutaCard';
import { AuthContext } from '../../utils/Interfaces/AuthInterface';

const TerapeutaPacientes: React.FC = () => {
  const [pacientes, setPacientes] = useState([]);
  const {user} = useContext(AuthContext);

    useEffect(() => {
        axiosConfig.get(`/terapias/pacientes?id=${user?.id}`)
            .then(response => {
                setPacientes(response.data);
            })
            .catch(error => {
                console.error('Error al recuperar los datos de los pacientes', error);
            });
    }, [user]);

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>Tus Pacientes</h1>
            <PacienteTerapeutaCard pacientes={pacientes} />
        </div>
    );
};

export default TerapeutaPacientes;