import { IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

interface UserEditableProps {
    label: string;
    value: string; // O 'any' si el valor puede ser de diferentes tipos, pero mejor especificar
    onSave: (newValue: string) => void; // Ajusta el tipo según lo que espera la función onSave
  }

  const UserEditable: React.FC<UserEditableProps> = ({ label, value, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [fieldValue, setFieldValue] = useState(value);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onSave(fieldValue);
    setIsEditing(false);
  };

  return (
    <div style={{ margin: '15px 0' }}>
      {isEditing ? (
        <TextField
          label={label}
          value={fieldValue}
          onChange={e => setFieldValue(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton style={{ marginLeft: '100px' }} onClick={handleSave}>
                <CheckIcon />
              </IconButton>
            ),
          }}
        />
      ) : (
        <div>
          {label}: {value}
          <IconButton style={{ marginLeft: '20px' }} onClick={handleEdit}>
            <EditIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default UserEditable;