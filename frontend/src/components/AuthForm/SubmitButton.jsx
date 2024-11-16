import React from 'react';
import { Button } from '@mui/material';

export const SubmitButton = ({ isLoading, type }) => (
  <Button
    type="submit"
    variant="contained"
    disabled={isLoading}
    sx={{
      borderRadius: 28,
      py: 1.5,
      bgcolor: 'primary.main',
      color: 'white',
      '&:hover': {
        bgcolor: 'primary.dark'
      }
    }}
  >
    {isLoading
      ? `${type === 'login' ? 'Logging in' : 'Signing Up'}...`
      : `${type === 'login' ? 'Log In' : 'Sign Up'}!`}
  </Button>
);