import React, { useEffect, useState } from 'react'
import axiosConfig from '../../../utils/config/axios.config';
import { IUser } from '../../../utils/Interfaces/back/IUser.interface';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';

export default function AdminUserTable() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser>({});
  const [isNewUser, setIsNewUser] = useState(false);

  const loadUsers = async () => {
      try {
          const response = await axiosConfig.get('/users');
          setUsers(response.data);
      } catch (error) {
          console.error('Error loading users:', error);
      }
  };

  useEffect(() => {
      loadUsers();
  }, []);

  const handleOpenDialog = (user?: IUser) => {
    if (user) {
        setSelectedUser(user);
        setIsNewUser(false);
    } else {
        setSelectedUser({});
        setIsNewUser(true);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveUser = async () => {
    try {
        if (isNewUser) {
            await axiosConfig.post('/users', selectedUser);
        } else {
            await axiosConfig.put(`/users?id=${selectedUser._id}`, selectedUser);
        }
        loadUsers();
        handleCloseDialog();
    } catch (error) {
        console.error('Error saving user:', error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
      try {
          await axiosConfig.delete(`/users?id=${userId}`);
          loadUsers();
      } catch (error) {
          console.error('Error deleting user:', error);
      }
  };

  return (
    <>
      <TableContainer component={Paper}>
          <Table>
              <TableHead>
                  <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Age</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Action</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {users.map(user => (
                      <TableRow key={user._id}>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.age}</TableCell>
                          <TableCell>{user.phone}</TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell>
                            <Button variant="contained" color="primary" style={{marginRight:'1rem'}}
                            onClick={() => handleOpenDialog(user)}>Update</Button>
                            <Button variant="contained" color="secondary" onClick={() => {if(user._id){handleDeleteUser(user._id)}}}>Delete</Button>
                          </TableCell>
                      </TableRow>
                  ))}
              </TableBody>
          </Table>
      </TableContainer>
      <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>Add User</Button>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>{isNewUser ? 'Add User' : 'Update User'}</DialogTitle>
          <DialogContent>
              <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Name"
                  type="text"
                  fullWidth
                  value={selectedUser.name || ''}
                  onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
              />
              <TextField
                  margin="dense"
                  id="email"
                  label="Email"
                  type="email"
                  fullWidth
                  value={selectedUser.email || ''}
                  onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
              />
              <TextField
                  margin="dense"
                  id="age"
                  label="Age"
                  type="number"
                  fullWidth
                  value={selectedUser.age || ''}
                  onChange={(e) => setSelectedUser({ ...selectedUser, age: parseInt(e.target.value) })}
              />
              <TextField
                  margin="dense"
                  id="phone"
                  label="Phone"
                  type="text"
                  fullWidth
                  value={selectedUser.phone || ''}
                  onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
              />
              <FormControl fullWidth>
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select
                      labelId="role-label"
                      id="role"
                      value={selectedUser.role || ''}
                      onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value as string })}
                  >
                      <MenuItem value='admin'>Administrador</MenuItem>
                      <MenuItem value='paciente'>Paciente</MenuItem>
                      <MenuItem value='terapeuta'>Terapeuta</MenuItem>
                  </Select>
              </FormControl>
             {isNewUser && (
                        <TextField
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                            value={selectedUser.password || 'default'}
                            onChange={(e) => setSelectedUser({ ...selectedUser, password: e.target.value })}
                        />
                    )}
          </DialogContent>
          <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={handleSaveUser}>Save</Button>
          </DialogActions>
      </Dialog>
    </>
    );
};

