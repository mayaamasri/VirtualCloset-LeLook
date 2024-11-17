import React from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, InputAdornment } from '@mui/material';
import { Search } from 'lucide-react';
import { SEASON_OPTIONS, OCCASION_OPTIONS } from './constants';

const FilterInputs = ({ filters, onFilterChange }) => {
    const handleChange = (field) => (event) => {
      onFilterChange({
        ...filters,
        [field]: event.target.value
      });
    };
  
    return (
      <Box sx={{ display: 'flex', gap: 3, flex: 1 }}>
        <TextField
          fullWidth
          placeholder="Search outfits..."
          value={filters.search}
          onChange={handleChange('search')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={20} />
              </InputAdornment>
            ),
          }}
        />
        <FormControl fullWidth>
          <InputLabel>Season</InputLabel>
          <Select
            value={filters.season}
            onChange={handleChange('season')}
            label="Season"
          >
            {SEASON_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Occasion</InputLabel>
          <Select
            value={filters.occasion}
            onChange={handleChange('occasion')}
            label="Occasion"
          >
            {OCCASION_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  };

export default FilterInputs;