import React, { useContext } from 'react';
import './App.css';
import TerapeutaPage from './pages/TerapeutaPage';
import AuthProvider from './components/Auth/AuthProvider';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthContext } from './utils/Interfaces/AuthInterface';
import AuthPage from './pages/AuthPage';
import AdminPage from './pages/AdminPage';
import PacientePage from './pages/PacientePage';


const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

const AppRoutes: React.FC = () => {
  const { isLoggedIn, user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/Auth" element={<AuthPage />} />
      {isLoggedIn && user?.role === 'admin' && <Route path="/admin" element={<AdminPage />} />}
      {isLoggedIn && user?.role === 'terapeuta' && <Route path="/terapeuta" element={<TerapeutaPage />} />}
      {isLoggedIn && <Route path="/paciente" element={<PacientePage />} />}
      <Route path="*" element={<Navigate to="/Auth" />} />
    </Routes>
  );
};

export default App;
