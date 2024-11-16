import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { PREFERENCE_OPTIONS } from '../constants';

export const FitSelect = ({ value, onChange, disabled }) => (
  <FormControl fullWidth>
    <InputLabel>Preferred Fit</InputLabel>
    <Select
      name="preferred_fit"
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      {PREFERENCE_OPTIONS.FITS.map(fit => (
        <MenuItem key={fit} value={fit}>{fit}</MenuItem>
      ))}
    </Select>
  </FormControl>
);