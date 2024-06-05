import React, { useEffect, useState } from 'react'
import axiosConfig from '../../../utils/config/axios.config';
import { IQuestion, questionType } from '../../../utils/Interfaces/back/IQuestion.interface';
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';

export default function AdminPreguntasTable() {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState<IQuestion>({});
    const [isNewQuestion, setIsNewQuestion] = useState(false);

    // Función para cargar las preguntas desde la API
    const loadQuestions = async () => {
        try {
            const response = await axiosConfig.get('/cuestionarios/questions');
            setQuestions(response.data);
        } catch (error) {
            console.error('Error loading questions:', error);
        }
    };

    // Cargar preguntas cuando el componente se monte
    useEffect(() => {
        loadQuestions();
    }, []);

    // Función para abrir el diálogo y seleccionar la pregunta a actualizar o agregar una nueva
    const handleOpenDialog = (question?: IQuestion) => {
        if (question) {
            setSelectedQuestion(question);
            setIsNewQuestion(false);
        } else {
            setSelectedQuestion({});
            setIsNewQuestion(true);
        }
        setOpenDialog(true);
    };

    // Función para cerrar el diálogo
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    // Función para guardar una pregunta (nueva o actualizada)
    const handleSaveQuestion = async () => {
        try {
            if (isNewQuestion) {
                await axiosConfig.post('/cuestionarios/questions', selectedQuestion); 
            } else {
                await axiosConfig.put(`/cuestionarios/questions?id=${selectedQuestion._id}`, selectedQuestion); 
            }
            loadQuestions(); 
            handleCloseDialog();
        } catch (error) {
            console.error('Error saving question:', error);
        }
    };

    const handleDeleteQuestion = async (questionId: string) => {
      try {
          await axiosConfig.delete(`/cuestionarios/questions?id=${questionId}`);
          loadQuestions();
      } catch (error) {
          console.error('Error deleting question:', error);
      }
  };

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Text</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {questions.map(question => (
                            <TableRow key={question._id}>
                                <TableCell>{question.name}</TableCell>
                                <TableCell>{question.text}</TableCell>
                                <TableCell>{question.tipo}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" style={{marginRight:'1rem'}}
                                    onClick={() => handleOpenDialog(question)}>Update</Button>
                                    <Button variant="contained" color="secondary" onClick={() => {if(question._id){handleDeleteQuestion(question._id)}}}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2, marginRight: 2 }}>
            <Button variant="contained" color="primary" style={{marginBottom:'1rem'}}
            onClick={() => handleOpenDialog()}>Add Question</Button></Box>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{isNewQuestion ? 'Add Question' : 'Update Question'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        value={selectedQuestion.name || ''}
                        onChange={(e) => setSelectedQuestion({ ...selectedQuestion, name: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        id="text"
                        label="Text"
                        type="text"
                        fullWidth
                        value={selectedQuestion.text || ''}
                        onChange={(e) => setSelectedQuestion({ ...selectedQuestion, text: e.target.value })}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="type-label">Type</InputLabel>
                        <Select
                            labelId="type-label"
                            id="type"
                            value={selectedQuestion.tipo || ''}
                            onChange={(e) => setSelectedQuestion({ ...selectedQuestion, tipo: e.target.value as questionType })}
                        >
                            <MenuItem value='likert'>Likert</MenuItem>
                            <MenuItem value='short'>Short</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleSaveQuestion}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
