export interface TableConfig {
    columns: { id: string; label: string }[];
    apiEndpoint: string;
  }
  
  export const tables: { [key: string]: TableConfig } = {
    usuarios: {
      columns: [
        { id: '_id', label: 'ID' },
        { id: 'role', label: 'Role' },
        { id: 'name', label: 'Name' },
        { id: 'email', label: 'Email' },
        { id: 'age', label: 'Age' },
        { id: 'phone', label: 'Phone' },
      ],
      apiEndpoint: '/users',
    },
    terapias: {
      columns: [
        { id: 'idTerapeuta', label: 'Terapeuta' },
        { id: 'idPaciente', label: 'Paciente' },
        { id: 'citas', label: 'Citas' },
        { id: 'registros', label: 'Registros' },
      ],
      apiEndpoint: '/terapias',
    },
    cuestionarios: {
      columns: [
        { id: 'name', label: 'Título' },
        { id: 'modelo', label: 'Modelo' },
        { id: 'tipo', label: 'Tipo' },
        { id: 'preguntas', label: 'Preguntas' },
      ],
      apiEndpoint: '/cuestionarios',
    },
    preguntas: {
      columns: [
        { id: 'name', label: 'Name' },
        { id: 'text', label: 'Text' },
        { id: 'tipo', label: 'Tipo' },
      ],
      apiEndpoint: '/cuestionarios/preguntas',
    },
    citas: {
      columns: [
        { id: 'date', label: 'Date' },
        { id: 'acude', label: 'Acude' },
        { id: 'informe', label: 'Informe' },
      ],
      apiEndpoint: '/terapias/citas',
    },
  };