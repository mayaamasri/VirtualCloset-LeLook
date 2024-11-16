// src/pages/LoginPage.jsx
import React from 'react';
import { Container } from '@mui/material';
import {AuthForm} from '../../components/AuthForm/AuthForm';

const LoginPage = () => {
  return (
    <Container maxWidth="sm">
      <AuthForm type="login"/>
    </Container>
  );
};

export default LoginPage;