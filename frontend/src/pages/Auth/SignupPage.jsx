import React from 'react';
import { Container } from '@mui/material';
import {AuthForm} from '../../components/AuthForm/AuthForm';

// SignupPage component
const SignupPage = () => {
  return (
    <Container maxWidth="sm">
      <AuthForm type="signup"/>
    </Container>
  );
};

export default SignupPage;