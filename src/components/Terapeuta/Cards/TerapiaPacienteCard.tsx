import React, { useEffect, useState } from 'react'
import { IUser } from '../../../utils/Interfaces/back/IUser.interface';
import { ITerapia } from '../../../utils/Interfaces/back/ITerapia.interface';
import axiosConfig from '../../../utils/config/axios.config';
import { Card, CardContent, List, ListItem, ListItemText, Typography } from '@mui/material';
import { ICuestionario } from '../../../utils/Interfaces/back/ICuestionario.interface';
import { IQuestion } from '../../../utils/Interfaces/back/IQuestion.interface';
import { IAnswerBase, ILikertAnswer, IShortAnswer } from '../../../utils/Interfaces/back/IAnswer.interface';
import { ICita } from '../../../utils/Interfaces/back/ICita.interface';
import TerapiaPacienteRespuestaCard from './TerapiaPacienteRespuestaCard';


interface TerapiaPacienteCardProps {
    paciente: IUser;
}

const TerapiaPacienteCard: React.FC<TerapiaPacienteCardProps> = ({ paciente }) => {
    const [terapia, setTerapia] = useState<ITerapia | null>(null);
    const [cuestionarios, setCuestionarios] = useState<ICuestionario[]>();
    const [preguntas, setPreguntas] = useState<IQuestion[]>();
    const [respuestas, setRespuestas] = useState<IAnswerBase[]|null>(null);
    const [citas, setCitas] = useState<ICita[]|null>(null);

    useEffect(() => {
        cargarTerapias();
    }, [paciente]);

    useEffect(() => {
      if (terapia) {
        cargarCuestionarios();
        cargarCitas();
    } }, [terapia]);
    
    useEffect(() => {
      if (cuestionarios) {
        cargarPreguntas();
        cargarRespuestas();
    } }, [cuestionarios]);

    const cargarTerapias = async () => {
        try {
            const response = await axiosConfig.get(`/terapias/terapeutaPaciente?id=${paciente._id}`);
            setTerapia(response.data);
        } catch (error) {
            console.error('Error loading users:', error);
        }
    };

    const cargarCuestionarios = async () => {
      try {
        const paciente = terapia?.idPaciente as unknown as IUser;
        const response = await axiosConfig.get(`/cuestionarios/paciente?id=${paciente._id}`)
        setCuestionarios(response.data);
      } catch (e) {
        console.log(`Error al cargar los cuestionarios`, e)
      }
    }

    const cargarPreguntas = () => {
      try{
        if (cuestionarios ){
          const questions = cuestionarios.flatMap(cuestionario => cuestionario.preguntas as unknown as IQuestion || []);
          setPreguntas(questions);

        }
      } catch (e) {
        console.log(`Error al cargar las preguntas`, e)
      }
    }

    const cargarRespuestas = () => {
      if(cuestionarios){
        const answers = cuestionarios.flatMap(cuestionario => cuestionario.respuestas as unknown as IAnswerBase || []);
        setRespuestas(answers);
      } else {
        console.log('no hay respuestas')
        setRespuestas(null);
      }
    }

    const cargarCitas = () => {
      if(terapia && terapia.citas){
        const advice = terapia.citas.flatMap(cita => cita as unknown as ICita); 
        setCitas(advice);
      }
    }

    if(terapia){
    return (
    <Card style={{marginTop:'2rem'}}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Terpaia de {paciente.name}
        </Typography>
        <List>
        <Typography variant="h6" gutterBottom>
          Citas
        </Typography>
        {
          citas?.map(cita => (
            <ListItem key={cita._id}>
              <ListItemText primary={` ${cita.date}`} />
              <ListItemText style={{marginLeft:'2rem'}} primary={`${cita.informe}`} />
            </ListItem>
          ))
        }
        <Typography variant="h6" gutterBottom>
          Registros
        </Typography>
        {
          cuestionarios?.map(cuestionario => {
            const answers = cuestionario.respuestas?.map(respuesta => respuesta as unknown as IAnswerBase) || [];
            return (
              <ListItem key={cuestionario._id}>
                <ListItemText style={{marginRight:'2rem'}} primary={`${cuestionario.name}`} />
                {/* Opcional: si quieres listar las respuestas aquí */}
                {answers.map(answer => (
                  <TerapiaPacienteRespuestaCard key={answer.idPregunta} answer={answer as ILikertAnswer | IShortAnswer} />
                ))}
              </ListItem>
            );
          })
        }
        </List>
      </CardContent>
    </Card>
    )} else {
        return (
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  No se ha seleccionado ninguna terapia
                </Typography>
              </CardContent>
            </Card>
          );
    }
};

export default TerapiaPacienteCard;