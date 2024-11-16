import React from 'react';
import { MenuItem } from '@mui/material';
import TextField from '../forms/TextField';
import { useCountries } from '../../hooks/useCountries';

export const CountrySelect = ({ value, onChange, disabled }) => {
  const { countries, loading, error } = useCountries();

  if (error) {
    return (
      <TextField
        select
        name="country_name"
        label="Country"
        value=""
        disabled
        error
        helperText={error}
      />
    );
  }

  return (
    <TextField
      select
      name="country_name"
      label="Country"
      value={value}
      onChange={onChange}
      disabled={disabled || loading}
      helperText={loading ? 'Loading countries...' : ''}
    >
      {countries.map((country) => (
        <MenuItem key={country.country_id} value={country.country_name}>
          {country.country_name}
        </MenuItem>
      ))}
    </TextField>
  );
};