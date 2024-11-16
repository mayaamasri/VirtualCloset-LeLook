import React from 'react';
import TextField from '../forms/TextField';
import PasswordField from '../forms/PasswordField';
import { CountrySelect } from './CountrySelect';

export const AuthFormFields = ({ type, formData, handleChange, isLoading }) => {
  return (
    <>
      {type === 'signup' && (
        <>
          <TextField
            name="first_name"
            placeholder="First name"
            value={formData.first_name}
            onChange={handleChange}
            disabled={isLoading}
          />
          <TextField
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            disabled={isLoading}
          />
            <CountrySelect
            value={formData.country_name}
            onChange={handleChange}
            disabled={isLoading}
          />
        </>
      )}
      
      <TextField
        name="email"
        placeholder="Email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        disabled={isLoading}
      />

      <PasswordField
        name="password_hash"
        placeholder="Password"
        value={formData.password_hash}
        onChange={handleChange}
        disabled={isLoading}
      />
    </>
  );
};
