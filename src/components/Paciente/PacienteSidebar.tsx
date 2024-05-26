import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import EventIcon from '@mui/icons-material/Event';
import SettingsIcon from '@mui/icons-material/Settings';

interface SidebarProps {
  setCurrentPage: (page: string) => void;
}

const PacienteSidebar: React.FC<SidebarProps> = ({ setCurrentPage }) => {
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
        <ListItemIcon><HomeIcon /></ListItemIcon>
        <ListItemText primary="Cuestionarios" />
      </ListItem>
      <ListItem button onClick={() => setCurrentPage('informes')}>
        <ListItemIcon><AssessmentIcon /></ListItemIcon>
        <ListItemText primary="Informes" />
      </ListItem>
      <ListItem button onClick={() => setCurrentPage('mis-citas')}>
        <ListItemIcon><EventIcon /></ListItemIcon>
        <ListItemText primary="Mis Citas" />
      </ListItem>
      <ListItem button onClick={() => setCurrentPage('configuracion')}>
        <ListItemIcon><SettingsIcon /></ListItemIcon>
        <ListItemText primary="Configuración" />
      </ListItem>
    </List>
  </Drawer>
  );
};

export default PacienteSidebar;