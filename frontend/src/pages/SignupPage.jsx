import React from 'react';
import { Container } from '@mui/material';
import SignupForm from '../components/auth/SignupForm';

const SignupPage = () => {
  return (
    <Container maxWidth="sm">
      <SignupForm />
    </Container>
  );
};

export default SignupPage;