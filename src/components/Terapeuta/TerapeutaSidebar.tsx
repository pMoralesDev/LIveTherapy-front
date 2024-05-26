import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import SettingsIcon from '@mui/icons-material/Settings';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import SummarizeIcon from '@mui/icons-material/Summarize';
import Groups3Icon from '@mui/icons-material/Groups3';

interface SidebarProps {
  setCurrentPage: (page: string) => void;
}

const TerapeutaSidebar: React.FC<SidebarProps> = ({ setCurrentPage }) => {
  return (
    <Drawer 
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
      }}
    >
    <List>
      <ListItem button onClick={() => setCurrentPage('cuestionarios')}>
        <ListItemIcon><PsychologyAltIcon /></ListItemIcon>
        <ListItemText primary="Cuestionarios" />
      </ListItem>
      <ListItem button onClick={() => setCurrentPage('registros')}>
        <ListItemIcon><AppRegistrationIcon /></ListItemIcon>
        <ListItemText primary="Registros" />
      </ListItem>
      <ListItem button onClick={() => setCurrentPage('informes')}>
        <ListItemIcon><SummarizeIcon /></ListItemIcon>
        <ListItemText primary="Informes" />
      </ListItem>
      <ListItem button onClick={() => setCurrentPage('pacientes')}>
        <ListItemIcon><Groups3Icon /></ListItemIcon>
        <ListItemText primary="Pacientes" />
      </ListItem>
      <ListItem button onClick={() => setCurrentPage('agenda')}>
        <ListItemIcon><EventIcon /></ListItemIcon>
        <ListItemText primary="Agenda" />
      </ListItem>
      <ListItem button onClick={() => setCurrentPage('configuracion')}>
        <ListItemIcon><SettingsIcon /></ListItemIcon>
        <ListItemText primary="Configuración" />
      </ListItem>
    </List>
  </Drawer>
  );
};

export default TerapeutaSidebar;