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

const seasonOptions = ['Spring', 'Summer', 'Fall', 'Winter'];
const occasionOptions = ['Casual', 'Formal', 'Business', 'Sports', 'Party'];

const OutfitDetailsForm = ({
  outfitName,
  season,
  occasion,
  onNameChange,
  onSeasonChange,
  onOccasionChange,
  onSave,
  isEditing = false
}) => {
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
            value={outfitName}
            onChange={(e) => onNameChange(e.target.value)}
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
              value={season}
              onChange={(e) => onSeasonChange(e.target.value)}
              label="Season"
              sx={{ borderRadius: 2, backgroundColor: '#d0c7b8' }}
            >
              {seasonOptions.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Occasion</InputLabel>
            <Select
              value={occasion}
              onChange={(e) => onOccasionChange(e.target.value)}
              label="Occasion"
              sx={{ borderRadius: 2, backgroundColor: '#d0c7b8' }}
            >
              {occasionOptions.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
        <Button
          variant="contained"
          onClick={onSave}
          sx={{ flex: 1, borderRadius: 2, height: '56px', bgcolor: '#6D5E52', color: 'white' }}
        >
          {isEditing ? 'Save Changes' : 'Create Outfit'}
        </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default OutfitDetailsForm;