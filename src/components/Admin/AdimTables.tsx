import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface DataTableProps {
    columns: { id: string; label: string }[];
    data: { [key: string]: any }[];
    onUpdate: (id: number) => void;
    onDelete: (id: number) => void;
    onAddNew: () => void;
}

const AdminDataTable: React.FC<DataTableProps> = ({ columns, data, onUpdate, onDelete, onAddNew }) => {
  
    const renderCellContent = (value: any) => {
      if (Array.isArray(value)) {
        return value.join(', ');
      }
      return value;
    };
    
      return (
        <Box sx={{ width: '85%', height: '70%', margin: 'auto', marginTop: 4 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id}>{column.label}</TableCell>
                  ))}
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id}>
                    {columns.map((column) => (
                      <TableCell key={column.id}>{renderCellContent(row[column.id])}</TableCell>
                    ))}
                    <TableCell>
                      <IconButton onClick={() => onUpdate(row.id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => onDelete(row.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="contained" color="primary" onClick={onAddNew} sx={{ marginTop: 2 }}>
            Add New
          </Button>
        </Box>
      );
};

export default AdminDataTable;