import { useState } from "react";
import { ICuestionario } from "../../../utils/Interfaces/back/ICuestionario.interface";
import { Button, Card, CardContent, Typography, styled } from "@mui/material";
import axiosConfig from "../../../utils/config/axios.config";
import { questionType } from "../../../utils/Interfaces/back/IQuestion.interface";
import { number } from "yup";


interface CuestionarioCardProps {
    cuestionario: ICuestionario;
  }
  
  const StyledCardContent = styled(CardContent)(({ theme }) => ({
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }));
  
  const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(1)
  }));
  
  
  const CuestionarioPacienteCard: React.FC<CuestionarioCardProps> = ({ cuestionario }) => {
    const [showRespuestas, setshowRespuestas] = useState(false);
    const [respuestas, setRespuestas] = useState<{ [idPregunta: string]: number | string }>({});
    
    const handleEnviarRespuestas = async () => {
      try {
        const respuestasIDs = [];
        const respuestasArray = Object.keys(respuestas).map((idPregunta) => {
          if(typeof respuestas[idPregunta] == 'number'){
            return {
              idPregunta: idPregunta,
              type: 'likert',
              respuesta: respuestas[idPregunta]
            };
          } else {
            return {
              idPregunta: idPregunta,
              type: 'short',
              respuesta: respuestas[idPregunta]
            };
          }
          
        });

        console.log(respuestasArray);
        try {
          for (const respuesta of respuestasArray) {
            const response = await axiosConfig.post('/cuestionarios/answers', respuesta);
            respuestasIDs.push(response.data._id);
          }
          const cuestionarioActualizado = { ...cuestionario, respuestas: respuestasIDs };
          await axiosConfig.put(`/cuestionarios?id=${cuestionarioActualizado._id}`, cuestionarioActualizado);
        } catch (error) {
          console.error('Error al enviar las respuestas:', error);
        }
        setRespuestas({});
        setshowRespuestas(false);
      } catch (error) {
        console.error('Error al enviar las respuestas:', error);
      }
    };

      return (
        <Card raised>
        <StyledCardContent>
          <Typography variant="h5" component="h2">
            {cuestionario.name}
          </Typography>
          <div style={{ textAlign: 'center' }}>
          <StyledButton variant="contained" color="primary" onClick={() => setshowRespuestas(true)}>
            Responder preguntas
          </StyledButton>
          </div>
          {showRespuestas && (
            <div>
              <Typography variant="h6" component="h3">Responder preguntas:</Typography>
              <form>
                {cuestionario.preguntas && cuestionario.preguntas.length > 0 ? (
                  cuestionario.preguntas.map((pregunta, index) => (
                    <div key={index}>
                      <Typography>{pregunta.text}</Typography>
                      {pregunta.tipo === questionType.LIKERT ? (
                        <input
                          type="number"
                          min="0"
                          max="5"
                          value={respuestas[pregunta._id ? pregunta._id : 99] || ''}
                          onChange={(e) => setRespuestas({ ...respuestas, [pregunta._id ? pregunta._id : 99]: parseInt(e.target.value)})}
                        />
                      ) : pregunta.tipo === questionType.SHORT ? (
                        <input
                          type="text"
                          value={respuestas[pregunta._id ? pregunta._id : 99] || ''}
                          onChange={(e) => setRespuestas({ ...respuestas, [pregunta._id ? pregunta._id : 99]: e.target.value })}
                        />
                      ) : null}
                    </div>
                  ))
                ) : (
                  <Typography variant="body2" component="p">No hay preguntas disponibles.</Typography>
                )}
                <StyledButton variant="contained" color="primary" onClick={handleEnviarRespuestas}>Enviar respuestas</StyledButton>
              </form>
            </div>
          )}
        </StyledCardContent>
        </Card>
      );
  };
  
  export default CuestionarioPacienteCard;