import React from 'react';
import { Stack } from '@mui/material';
import { StyleSelect } from './StyleSelect';
import { ColorSelect } from './ColorSelect';
import { FitSelect } from './FitSelect';
import { WeatherToggle } from './WeatherToggle';

export const Fields = ({
  formData,
  handleChange,
  handleColorSelect,
  handleWeatherToggle,
  isLoading
}) => (
  <Stack spacing={3}>
    <StyleSelect
      value={formData.preferred_style}
      onChange={handleChange}
      disabled={isLoading}
    />
    <ColorSelect
      selectedColors={formData.favorite_colors}
      onColorSelect={handleColorSelect}
    />
    <FitSelect
      value={formData.preferred_fit}
      onChange={handleChange}
      disabled={isLoading}
    />
    <WeatherToggle
      checked={formData.weather_sensitivity}
      onChange={handleWeatherToggle}
    />
  </Stack>
);