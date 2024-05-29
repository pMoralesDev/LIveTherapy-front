import axiosConfig from '../utils/config/axios.config';

// Función para actualizar un elemento
export const updateItem = async (id: number, data: any, apiEndpoint: string) => {
  try {
    const response = await axiosConfig.put(`${apiEndpoint}/${id}`, data);
    console.log('Update successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating item:', error);
    throw error;
  }
};

// Función para borrar un elemento
export const deleteItem = (data: any[], id: number) => {
  return data.filter(item => item.id !== id);
};

// Función para agregar un nuevo elemento
export const addNewItem = (data: any[], newRow: any) => {
  const newId = data.length ? data[data.length - 1].id + 1 : 1;
  return [...data, { id: newId, ...newRow }];
};

// Función para obtener una plantilla de fila nueva basada en la tabla
export const getNewRowTemplate = (table: string) => {
  switch (table) {
    case 'usuarios':
      return { _id: '', role: '', name: '', email: '', password: '', age: 0, phone: '' };
    case 'terapias':
      return { name: '', idTerapeuta: '', idPaciente: '', citas: [], registros: [], chat: [] };
    case 'cuestionarios':
      return { name: '', modelo: false, tipo: '', preguntas: [] };
    case 'preguntas':
      return { _id: '', name: '', text: '', tipo: '' };
    case 'citas':
      return { _id: '', date: new Date(), acude: true, informe: '' };
    default:
      return {};
  }
};