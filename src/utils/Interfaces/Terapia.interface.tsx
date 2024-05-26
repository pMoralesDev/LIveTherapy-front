import { Registro } from "./Registros.interface";

export interface Terapia {
    _id: string;
    name: string;
    idTerapeuta: string;
    idPaciente: string;
    citas: string[];
    registros: Registro[];
    chat: string[];
  }