import { ICuestionario } from "./back/ICuestionario.interface";


export interface Terapia {
    _id: string;
    name: string;
    idTerapeuta: string;
    idPaciente: string;
    citas: string[];
    registros: ICuestionario[];
    chat: string[];
  }