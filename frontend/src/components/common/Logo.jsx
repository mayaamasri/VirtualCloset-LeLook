import React from 'react';
import { Typography } from '@mui/material';

// Logo component
const Logo = () => {
  return (
    <Typography
      variant="h1"
      sx={{
        fontFamily: 'Playfair Display',
        fontSize: '4rem',
        fontStyle: 'italic',
        color: 'primary.main',
        textAlign: 'center'
      }}
    >
      Lelook
    </Typography>
  );
};

export default Logo;