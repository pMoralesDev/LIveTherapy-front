import { AppBar, Toolbar, Typography, InputBase, IconButton, Box } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '../utils/Interfaces/AuthInterface';
import { useContext, useEffect, useState } from 'react';
import { IUser } from '../utils/Interfaces/back/IUser.interface';
import axiosConfig from '../utils/config/axios.config';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const CustomHeader: React.FC = () => {
  
    const {logout: authLogout, user} = useContext(AuthContext);
    const [userData, setUserData] = useState<IUser | null>(null);
  
    useEffect(() => {
      if (user && user.id) {
          axiosConfig.get(`/users/${user.id}`)
              .then(response => {
                  setUserData(response.data); 
              })
              .catch(error => {
                  console.error('Error fetching user data:', error);
              });
      }
  }, [user]);
    
  
    return (
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
          <img src={`${process.env.PUBLIC_URL}/media/MoralesDev.png`} alt="Logo" style={{ marginRight: '16px' }} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" noWrap component="div" style={{marginRight: '3rem'}}>
              {userData?.name ?? 'Nombre de Usuario'}
            </Typography>
            <IconButton color="inherit" onClick={authLogout}  >
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    );
  };
  
  export default CustomHeader;