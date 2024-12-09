import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Button, 
  CircularProgress, 
  Alert,
  Grid
} from '@mui/material';
import { Sparkles} from 'lucide-react';
import WeatherOccasionForm from './weatherocc';
import AiService from '../services/aiService';

const AiSuggestions = ({ userItems, userPreferences }) => {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState(null);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState('');
  const [occasion, setOccasion] = useState('');

  const handleGenerateSuggestion = async () => {
    if (!weather || !occasion) {
      setError('Please select both weather and occasion');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
    console.log('User items:', userItems);
    console.log('User preferences:', userPreferences);
      // Log the data we're about to send
      console.log('Generating suggestion with:', {
        itemsCount: userItems,
        preferencesSet: !!userPreferences,
        weather,
        occasion
      });
      
      const params = {
        items: userItems,
        preferences: userPreferences,
        weather,
        occasion
      };
      
      const response = await AiService.generateOutfitSuggestion(params);
      console.log('Suggestion received:', response);
      
      if (!response) {
        throw new Error('No suggestion received');
      }

      setSuggestion(response);
    } catch (err) {
      console.error('Error generating suggestion:', err);
      setError(err.response?.data?.error || "Failed to generate suggestion. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    const cleanPath = imagePath.replace(/^\/+/, '');
    return `http://localhost:4000/${cleanPath}`;
  };

  return (
    <Box sx={{ maxWidth: '4xl', mx: '100px' }}>
      <Paper sx={{ p: 4, borderRadius: 2, bgcolor: 'white' }}>
        <WeatherOccasionForm
          weather={weather}
          occasion={occasion}
          onWeatherChange={(e) => setWeather(e.target.value)}
          onOccasionChange={(e) => setOccasion(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleGenerateSuggestion}
          disabled={loading || !weather || !occasion}
          startIcon={<Sparkles />}
          fullWidth
          sx={{
            py: 2,
            mt: 3,
            borderRadius: 28,
            bgcolor: 'primary.main',
            '&:hover': { bgcolor: 'primary.dark' }
          }}
        >
          {loading ? 'Creating your outfit...' : 'Get AI Suggestion'}
        </Button>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {loading && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
            <CircularProgress size={40} />
            <Typography sx={{ mt: 2, color: 'text.secondary' }}>
              Creating your perfect outfit...
            </Typography>
          </Box>
        )}

        {suggestion && (
          <Box sx={{ mt: 4 }}>
            <Box sx={{ bgcolor: 'secondary.light', p: 3, borderRadius: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Your Outfit
              </Typography>
              <Typography>{suggestion.description}</Typography>
            </Box>

            {suggestion && suggestion.selected_items?.length > 0 && (
  <Box sx={{ mt: 3 }}>
    <Typography variant="h6" gutterBottom>
      Selected Items
    </Typography>
    <Grid container spacing={2}>
      {suggestion.selected_items.map((item) => (
        item && item.item_id ? ( // Add null check
          <Grid item xs={12} sm={6} md={4} key={item.item_id}>
            <Paper sx={{ p: 2 }}>
              <Box
                component="img"
                src={getImageUrl(item.image_url)}
                alt={item.name || 'Item image'}
                sx={{
                  width: '100%',
                  height: 200,
                  objectFit: 'contain',
                  mb: 2
                }}
              />
              <Typography variant="subtitle1">
                {item.name || 'Unnamed item'}
              </Typography>
            </Paper>
          </Grid>
        ) : null
      ))}
    </Grid>
  </Box>
)}

            <Box sx={{ mt: 4, bgcolor: 'primary.lighter', p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Styling Tips
              </Typography>
              <Typography>{suggestion.styling_tips}</Typography>
            </Box>

            <Box sx={{ mt: 4, bgcolor: 'info.lighter', p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Weather Considerations
              </Typography>
              <Typography>{suggestion.weather_notes}</Typography>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default AiSuggestions;