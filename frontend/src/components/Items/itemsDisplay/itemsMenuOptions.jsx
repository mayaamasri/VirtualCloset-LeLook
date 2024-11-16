import React from 'react';
import { Menu, MenuItem } from '@mui/material';
import { Edit2, Trash2 } from 'lucide-react';

export const MenuOptions = ({ anchorEl, open, onClose, onEdit, onDelete, item }) => (
  <Menu
    anchorEl={anchorEl}
    open={open}
    onClose={onClose}
  >
    <MenuItem onClick={() => {
      onClose();
      onEdit(item);
    }}>
      <Edit2 size={16} style={{ marginRight: 8 }} />
      Edit
    </MenuItem>
    <MenuItem 
      onClick={() => {
        onClose();
        onDelete(item);
      }}
      sx={{ color: 'error.main' }}
    >
      <Trash2 size={16} style={{ marginRight: 8 }} />
      Delete
    </MenuItem>
  </Menu>
);