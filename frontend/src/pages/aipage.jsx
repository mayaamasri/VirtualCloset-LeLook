// src/pages/AiSuggestionsPage.jsx
import React, { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import AiSuggestions from '../components/outfitSugg';
import ItemService from '../services/itemService';
import UserPreferenceService from '../services/userPrefService';

const AiSuggestionsPage = () => {
  const [userItems, setUserItems] = useState([]);
  const [userPreferences, setUserPreferences] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const [itemsResponse, preferencesResponse] = await Promise.all([
          ItemService.getAllItemsByUserId(userId),
          UserPreferenceService.getPreferences(userId)
        ]);

        setUserItems(itemsResponse.data);
        setUserPreferences(preferencesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'Playfair Display',
            fontStyle: 'italic',
            color: 'primary.main',
            mb: 4,
            textAlign: 'center'
          }}
        >
          AI Stylist
        </Typography>

        <AiSuggestions 
          userItems={userItems} 
          userPreferences={userPreferences} 
        />
      </Box>
    </Container>
  );
};

export default AiSuggestionsPage;