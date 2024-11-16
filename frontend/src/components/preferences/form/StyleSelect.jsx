import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { PREFERENCE_OPTIONS } from '../constants';

export const StyleSelect = ({ value, onChange, disabled }) => (
  <FormControl fullWidth>
    <InputLabel>Preferred Style</InputLabel>
    <Select
      name="preferred_style"
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      {PREFERENCE_OPTIONS.STYLES.map(style => (
        <MenuItem key={style} value={style}>{style}</MenuItem>
      ))}
    </Select>
  </FormControl>
);