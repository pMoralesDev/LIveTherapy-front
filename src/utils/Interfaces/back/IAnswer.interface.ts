
export enum AnswerType {
  LIKERT = 'likert',
  SHORT = 'short'
}

export interface IAnswerBase{
  idPregunta: string;
  type: AnswerType;
}

export interface ILikertAnswer extends IAnswerBase {
  respuesta: number;
}

export interface IShortAnswer extends IAnswerBase {
  respuesta: string;
}

