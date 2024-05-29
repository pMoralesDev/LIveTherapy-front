import { Cuestionario } from "../utils/Interfaces/Cuestionarios.interface";
import { Terapia } from "../utils/Interfaces/Terapia.interface";
import axiosConfig from "../utils/config/axios.config";
import { getUserIdFromToken } from "./tokenService";


export const fetchCuestionariosForUser = async (token: string): Promise<Cuestionario[]> => {
  try {
    const userId = getUserIdFromToken(token);
    if (!userId) {
      throw new Error('Unable to extract user ID from token');
    }

    const response = await axiosConfig.get('/terapias');
    const terapias: Terapia[] = response.data;

    const registrosFiltrados = terapias
      .filter((terapia) => terapia.idTerapeuta === userId)
      .flatMap((terapia) => terapia.registros);

    return registrosFiltrados;
    
  } catch (error) {
    console.error('Error fetching cuestionarios:', error);
    return [];
  }
};
