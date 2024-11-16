import React, { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCountries } from '../../hooks/useCountries';
import { AuthFormFields } from './AuthFormFields';
import { SubmitButton } from './SubmitButton';
import Logo from '../common/Logo';

export const AuthForm = ({ type }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    email: '',
    password_hash: '',
    country_name: '',
    username: ''
  });

  const { error: authError, isLoading, handleSubmit } = useAuth(type);
  const {error: countriesError} = useCountries();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  const error = authError || countriesError;
  
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: type === 'login' ? 28 : 16,
        p: 3
      }}
    >
      <Stack spacing={3}>
        <Logo />
        
        <AuthFormFields
          type={type}
          formData={formData}
          handleChange={handleChange}
          isLoading={isLoading}
        />

        {error && (
          <Typography color="error" textAlign="center">
            {error}
          </Typography>
        )}

        <SubmitButton isLoading={isLoading} type={type} />

        <Typography
          textAlign="center"
          sx={{
            mt: 2,
            '& a': {
              color: 'primary.main',
              textDecoration: 'none',
              fontStyle: 'italic',
              '&:hover': {
                textDecoration: 'underline'
              }
            }
          }}
        >
          {type === 'login' ? (
            <>Don't have an account? <Link to="/signup">Sign Up!</Link></>
          ) : (
            <>Already have an account? <Link to="/login">Log In!</Link></>
          )}
        </Typography>
      </Stack>
    </Box>
  );
};