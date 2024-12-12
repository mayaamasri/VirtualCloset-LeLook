import React from 'react';
import { Box, Typography, FormControlLabel, Switch, FormHelperText } from '@mui/material';

// WeatherToggle component
export const WeatherToggle = ({ checked, onChange }) => (
  <Box>
    {/* FormControlLabel */}
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          onChange={onChange}
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
);
