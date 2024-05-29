import { Cuestionario } from "./Cuestionarios.interface";


export interface Terapia {
    _id: string;
    name: string;
    idTerapeuta: string;
    idPaciente: string;
    citas: string[];
    registros: Cuestionario[];
    chat: string[];
  }