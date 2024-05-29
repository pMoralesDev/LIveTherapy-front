
export interface ITerapia {
    _id?: string;
    idTerapeuta: string;
    idPaciente: string;
    citas: string[];
    registros: string[];
    chat: string[];
}