import React from 'react';
import { 
  Grid, 
  Paper,
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button 
} from '@mui/material';

export const SEASON_OPTIONS = ['Spring', 'Summer', 'Fall', 'Winter'];
export const OCCASION_OPTIONS = ['Casual', 'Formal', 'Business', 'Sports', 'Party'];

const OutfitDetailsForm = ({
  formData,
  onChange,
  onSave,
  isEditing = false
}) => {
  const handleChange = (field) => (event) => {
    onChange(field, event.target.value);
  };

  return (
    <Paper
      elevation={3}
      sx={{ 
        mt: 3, 
        p: 3,
        borderRadius: 2,
        backgroundColor: 'primary.main'
      }}
    >
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="Outfit Name"
            value={formData.outfitName}
            onChange={handleChange('outfitName')}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: '#d0c7b8'
              }
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Season</InputLabel>
            <Select
              value={formData.season}
              onChange={handleChange('season')}
              label="Season"
              sx={{ borderRadius: 2, backgroundColor: '#d0c7b8' }}
            >
              {SEASON_OPTIONS.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Occasion</InputLabel>
            <Select
              value={formData.occasion}
              onChange={handleChange('occasion')}
              label="Occasion"
              sx={{ borderRadius: 2, backgroundColor: '#d0c7b8' }}
            >
              {OCCASION_OPTIONS.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <Button
            variant="contained"
            onClick={onSave}
            fullWidth
            sx={{ 
              borderRadius: 2, 
              height: '56px', 
              bgcolor: '#AE9276', 
              color: 'white',
            }}
          >
            {isEditing ? 'Save Changes' : 'Create Outfit'}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default OutfitDetailsForm;