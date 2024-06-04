import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../utils/Interfaces/AuthInterface';
import axiosConfig from '../../utils/config/axios.config';
import InformesTerapeutaCard from './Cards/InformesTerapeutaCard';

const TerapeutaInformes: React.FC = () => {

  const [informes, setInformes] = useState<any[]>([]);
  const { user: authUser } = useContext(AuthContext);

  useEffect(() => {
      if (authUser){
        axiosConfig.get(`/terapias/citas/informes?id=${authUser.id}`)
        .then(response => {
          console.log(response.data);
            setInformes(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
      }
      
  }, [authUser]);

  return (
    <div>
      <h1 style={{textAlign: 'center'}}>Tus Informes</h1>
      {informes.map((informe, index) => (
        <InformesTerapeutaCard key={`${informe.fechaInforme}-${index}`} informe={informe} />
      ))}
    </div>
  );

};

export default TerapeutaInformes;