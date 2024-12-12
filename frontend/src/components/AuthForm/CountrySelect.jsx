import React from 'react';
import { MenuItem } from '@mui/material';
import TextField from '../forms/TextField';
import { useCountries } from '../../hooks/useCountries';

// CountrySelect component
export const CountrySelect = ({ value, onChange, disabled }) => {
  const { countries, loading, error } = useCountries();

  if (error) {
    // Display error message if there is an error
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
      {/* MenuItem components for each country */}
      {countries.map((country) => (
        <MenuItem key={country.country_id} value={country.country_name}>
          {country.country_name}
        </MenuItem>
      ))}
    </TextField>
  );
};