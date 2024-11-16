import React from 'react';
import { 
  Grid, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  InputAdornment,
  Box,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';

const SEASON_OPTIONS = [
  { value: 'all', label: 'All Seasons' },
  { value: 'SPRING', label: 'Spring' },
  { value: 'SUMMER', label: 'Summer' },
  { value: 'FALL', label: 'Fall' },
  { value: 'WINTER', label: 'Winter' },
  { value: 'ALL_SEASONS', label: 'All Year' }
];

const OCCASION_OPTIONS = [
  { value: 'all', label: 'All Occasions' },
  { value: 'CASUAL', label: 'Casual' },
  { value: 'FORMAL', label: 'Formal' },
  { value: 'BUSINESS', label: 'Business' },
  { value: 'SPORTS', label: 'Sports' },
  { value: 'PARTY', label: 'Party' }
];

const OutfitsFilter = ({ filters, onFilterChange }) => {
  const handleFilterChange = (field) => (event) => {
    onFilterChange({
      ...filters,
      [field]: event.target.value
    });
  };
  const navigate = useNavigate();
  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
      }}>
        <TextField
            fullWidth
            placeholder="Search outfits..."
            value={filters.search}
            onChange={handleFilterChange('search')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} />
                </InputAdornment>
              ),
            }}
            sx={{mr:3}}
          />
        <FormControl fullWidth>
            <InputLabel>Season</InputLabel>
            <Select
              value={filters.season}
              onChange={handleFilterChange('season')}
              label="Season"
              sx={{ 
                mr:3
              }}
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
              onChange={handleFilterChange('occasion')}
              label="Occasion"
              sx={{
                mr:3
              }}
            >
              {OCCASION_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={() => navigate('/outfits/create')}
          sx={{
            bgcolor: 'primary.main',
            py:2,
            width: '50vh',
            color: 'white',
            '&:hover': {
              bgcolor: 'primary.dark'
            }
          }}
        >
          Add Outfit
        </Button>
      </Box>
    </Box>
  );
};

export default OutfitsFilter;