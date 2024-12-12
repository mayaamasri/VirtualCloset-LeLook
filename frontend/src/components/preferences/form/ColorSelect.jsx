import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { PREFERENCE_OPTIONS } from '../constants';
import { PREFERENCE_STYLES } from '../styles';

// ColorSelect component
export const ColorSelect = ({ selectedColors, onColorSelect }) => (
  <Box>
    {/* Title */}
    <Typography variant="subtitle1" mb={2} color="text.secondary">
      Favorite Colors
    </Typography>
    {/* Color chips */}
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {PREFERENCE_OPTIONS.COLORS.map(color => (
        <Chip
          key={color}
          label={color}
          onClick={() => onColorSelect(color)}
          variant={selectedColors.includes(color) ? "filled" : "outlined"}
          color={selectedColors.includes(color) ? "primary" : "default"}
          sx={PREFERENCE_STYLES.colorChip}
        />
      ))}
    </Box>
  </Box>
);