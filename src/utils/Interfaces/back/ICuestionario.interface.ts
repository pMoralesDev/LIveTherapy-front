import { IQuestion } from "./IQuestion.interface";

export enum cuestionarioTipo {
    AUTOINFORME = 'autoinforme',
    COMPETENCIAS = 'competnecias',
    ACTITUDES = 'actitudes',
    CONDUCTUAL = "conductual",
}

export interface ICuestionario {
    _id?: string;
    name?: string;
    modelo?: boolean;
    tipo?: string;
    preguntas?: IQuestion[];
    respuestas?: string[];
}