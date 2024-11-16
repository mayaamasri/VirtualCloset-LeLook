import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Typography,
  FormControlLabel,
  Switch,
  FormHelperText
} from '@mui/material';
import { styleOptions, colorOptions, fitOptions } from './constants';

const PreferenceFormFields = ({ formData, handleChange, handleColorSelect, handleWeatherToggle, isLoading }) => (
  <>
    <FormControl fullWidth>
      <InputLabel>Preferred Style</InputLabel>
      <Select
        name="preferred_style"
        value={formData.preferred_style}
        onChange={handleChange}
        disabled={isLoading}
      >
        {styleOptions.map(style => (
          <MenuItem key={style} value={style}>{style}</MenuItem>
        ))}
      </Select>
    </FormControl>

    <Box>
      <Typography variant="subtitle1" mb={2} color="text.secondary">
        Favorite Colors
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {colorOptions.map(color => (
          <Chip
            key={color}
            label={color}
            onClick={() => handleColorSelect(color)}
            variant={formData.favorite_colors.includes(color) ? "filled" : "outlined"}
            color={formData.favorite_colors.includes(color) ? "primary" : "default"}
            sx={{ borderRadius: 2 }}
          />
        ))}
      </Box>
    </Box>

    <FormControl fullWidth>
      <InputLabel>Preferred Fit</InputLabel>
      <Select
        name="preferred_fit"
        value={formData.preferred_fit}
        onChange={handleChange}
        disabled={isLoading}
      >
        {fitOptions.map(fit => (
          <MenuItem key={fit} value={fit}>{fit}</MenuItem>
        ))}
      </Select>
    </FormControl>

    <Box>
      <FormControlLabel
        control={
          <Switch
            checked={formData.weather_sensitivity}
            onChange={handleWeatherToggle}
            name="weather_sensitivity"
            color="primary"
          />
        }
        label={
          <Box>
            <Typography>Enable Weather-Based Recommendations</Typography>
            <FormHelperText>
              Allow the app to suggest outfits based on current weather conditions
            </FormHelperText>
          </Box>
        }
      />
    </Box>
  </>
);

export default PreferenceFormFields;