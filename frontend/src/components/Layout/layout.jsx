import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './header';

const Layout = () => {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Header />
      <Box component="main">
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;