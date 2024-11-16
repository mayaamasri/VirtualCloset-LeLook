import React from 'react';
import { Container } from '@mui/material';
import {AuthForm} from '../../components/AuthForm/AuthForm';

const SignupPage = () => {
  return (
    <Container maxWidth="sm">
      <AuthForm type="signup"/>
    </Container>
  );
};

export default SignupPage;