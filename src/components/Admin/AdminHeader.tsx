import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '../../utils/Interfaces/AuthInterface';

interface HeaderProps {
  onSelectTable: (table: string) => void;
}

const AdminHeader: React.FC<HeaderProps> = ({ onSelectTable }) => {

  const { logout: authLogout } = useContext(AuthContext);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Panel
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', flexGrow: 2 }}>
            <Button color="inherit" onClick={() => onSelectTable('usuarios')}>Usuarios</Button>
            <Button color="inherit" onClick={() => onSelectTable('terapias')}>Terapias</Button>
            <Button color="inherit" onClick={() => onSelectTable('cuestionarios')}>Cuestionarios</Button>
            <Button color="inherit" onClick={() => onSelectTable('preguntas')}>Preguntas</Button>
            <Button color="inherit" onClick={() => onSelectTable('citas')}>Citas</Button>
          </Box>
          <Box sx={{ flexGrow: 1, textAlign: 'right' }}>
            <IconButton color="inherit" onClick={authLogout}>
              <LogoutIcon />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;