import React from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import Logo from '../common/Logo';
import PreferenceFormFields from './preferenceFormField';
import { usePreferencesForm } from '../../hooks/usePreferencesForm';

const PreferenceForm = ({ mode = 'create' }) => {
  const {
    formData,
    error,
    isLoading,
    handleChange,
    handleWeatherToggle,
    handleColorSelect,
    handleSubmit,
    navigate
  } = usePreferencesForm(mode);

  if (mode === 'edit' && isLoading) {
    return (
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography>Loading preferences...</Typography>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto', mt: 10, p: 3 }}>
      <Stack spacing={3}>
        <Logo />
        <Typography
          variant="h5"
          textAlign="center"
          color="text.secondary"
          sx={{ fontFamily: 'Playfair Display', fontStyle: 'italic' }}
        >
          {mode === 'edit' ? 'Update Your Preferences' : 'Let\'s personalize your experience'}
        </Typography>

        <PreferenceFormFields
          formData={formData}
          handleChange={handleChange}
          handleColorSelect={handleColorSelect}
          handleWeatherToggle={handleWeatherToggle}
          isLoading={isLoading}
        />

        {error && (
          <Typography color="error" textAlign="center">
            {error}
          </Typography>
        )}

        <Stack direction="row" spacing={2}>
          {mode === 'edit' && (
            <Button
              type="button"
              variant="outlined"
              onClick={() => navigate('/homepage')}
              sx={{
                borderRadius: 28,
                py: 1.5,
                flex: 1
              }}
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            sx={{
              borderRadius: 28,
              py: 1.5,
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': { bgcolor: 'primary.dark' },
              flex: 1
            }}
          >
            {isLoading ? `${mode === 'edit' ? 'Updating' : 'Creating'}...` : `${mode === 'edit' ? 'Update' : 'Create'} Preferences`}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default PreferenceForm;