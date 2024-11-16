import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material';

export const DeleteDialog = ({ open, itemName, onClose, onConfirm }) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="delete-dialog-title"
    aria-describedby="delete-dialog-description"
  >
    <DialogTitle id="delete-dialog-title">Delete Item</DialogTitle>
    <DialogContent id="delete-dialog-description">
      <Typography>
        Are you sure you want to delete "{itemName}"? 
        This action cannot be undone.
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button
        onClick={onClose}
        variant="outlined"
        color="primary"
        sx={{ borderRadius: 28 }}
        autoFocus
      >
        Cancel
      </Button>
      <Button
        onClick={onConfirm}
        color="error"
        variant="contained"
        sx={{ borderRadius: 28 }}
      >
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);