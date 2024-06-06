import React from 'react';
import { ILikertAnswer, IShortAnswer } from '../../../utils/Interfaces/back/IAnswer.interface';

type AnswerProps = {
    answer: ILikertAnswer | IShortAnswer;
  }
  
  const LikertAnswer = ({ respuesta }: { respuesta: number }) => (
    <div style={{marginRight: '2rem'}}>{respuesta}</div>
  );
  
  const ShortAnswer = ({ respuesta }: { respuesta: string }) => (
    <div style={{marginRight: '2rem'}}>{respuesta}</div>
  );
  
  const TerapiaPacienteRespuestaCard = ({ answer }: AnswerProps) => {
    switch (answer.type) {
      case 'likert':
        if (typeof answer.respuesta === 'number') {
          return <LikertAnswer respuesta={answer.respuesta} />;
        }
        break;
      case 'short':
        if (typeof answer.respuesta === 'string') {
          return <ShortAnswer respuesta={answer.respuesta} />;
        }
        break;
      default:
        return <div>Tipo de respuesta no reconocido</div>;
    }
    return <div>Error: Respuesta no válida para el tipo de pregunta</div>;
  };
  
  export default TerapiaPacienteRespuestaCard;
