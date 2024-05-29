
export enum questionType {
  LIKERT = 'likert',
  SHORT = 'short'
}

export interface IQuestion {
  _id?: string;
  name: string;
  text: string;
  tipo: questionType;
}