import React from 'react';
import { Stack, TextField, FormControl, InputLabel, Select, MenuItem, Typography, Box, Grid, Chip } from '@mui/material';
import { ITEM_CONSTANTS } from './constants';
import { ITEM_STYLES } from './styles';

// FormFields component
export const FormFields = ({ formData, handleChange, categories }) => (
  <Stack spacing={3}>
    {/* Item Name */}
    <TextField
      fullWidth
      label="Item Name"
      name="name"
      value={formData.name}
      onChange={handleChange}
      required
    />

    {/* Item Description */}
    <FormControl fullWidth required>
      <InputLabel>Category</InputLabel>
      {/* Category Select */}
      <Select
        name="category"
        value={formData.category}
        onChange={handleChange}
      >
        {categories.map((category) => (
          <MenuItem key={category.category_id} value={category.category_name}>
            {category.category_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

    {/* Item Description */}
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {/* Item Description */}
        <Typography variant="subtitle1" color="text.secondary" mb={1}>
          Color
        </Typography>
        {/* Color Chips */}
        <Box sx={ITEM_STYLES.chipContainer}>
          {ITEM_CONSTANTS.COLOR_OPTIONS.map((color) => (
            <Chip
              key={color}
              label={color}
              onClick={() => handleChange({
                target: { name: 'color', value: color }
              })}
              variant={formData.color === color ? "filled" : "outlined"}
              color={formData.color === color ? "primary" : "default"}
            />
          ))}
        </Box>
      </Grid>

      {/* Season */}
      <Grid item xs={12}>
        <Typography variant="subtitle1" color="text.secondary" mb={1}>
          Season
        </Typography>
        <Box sx={ITEM_STYLES.chipContainer}>
          {ITEM_CONSTANTS.SEASON_OPTIONS.map((season) => (
            <Chip
              key={season}
              label={season}
              onClick={() => handleChange({
                target: { name: 'season', value: season }
              })}
              variant={formData.season === season ? "filled" : "outlined"}
              color={formData.season === season ? "primary" : "default"}
            />
          ))}
        </Box>
      </Grid>
    </Grid>
  </Stack>
);