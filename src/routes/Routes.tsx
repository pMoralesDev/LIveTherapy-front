import { Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import AdminPage from "../pages/AdminPage";
import TerapeutaPage from "../pages/TerapeutaPage";
import PacientePage from "../pages/PacientePage";
import { AuthContext } from "../utils/Interfaces/AuthInterface";
import { useContext } from "react";

const GeneralRoutes: React.FC = () => {
    const { isLoggedIn, user } = useContext(AuthContext);
  
    return (
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        {isLoggedIn && user?.role === 'admin' && <Route path="/admin" element={<AdminPage />} />}
        {isLoggedIn && user?.role === 'terapeuta' && <Route path="/terapeuta" element={<TerapeutaPage />} />}
        {isLoggedIn && user?.role === 'paciente' && <Route path="/paciente" element={<PacientePage />} />}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
};

export default GeneralRoutes;