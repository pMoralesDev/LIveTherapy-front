export interface Cuestionario {
    _id: string;
    name: string;
    modelo: boolean;
    tipo: string;
    preguntas: string[];
    respuestas: string[];
}