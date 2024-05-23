import React from 'react';
import './App.css';
import { ThemeProvider, createTheme  } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import SignIn from './components/forms/LoginForm';

function App() {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SignIn />
    </ThemeProvider>
  );
}

export default App;
