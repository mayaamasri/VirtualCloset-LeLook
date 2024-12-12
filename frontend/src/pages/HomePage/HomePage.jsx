import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import { Plus, Wand, Shirt } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/authService';
import { useWeather } from '../../hooks/useWeather';

// HomePage component
const HomePage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const { weather, loading: weatherLoading, error: weatherError } = useWeather();

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (userId) {
          // Fetch user details
          const response = await AuthService.getUserDetails(userId);
          setUserName(response.data.user.first_name);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserName();
  }, []);

  return (
    <Box
      sx={{
        minHeight: '91vh',
        width: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Background container with shifted image */}
      <Box
        sx={{
          position: 'absolute',
          left: '-5%', 
          width: '105%', 
          height: '100%',
          backgroundImage: 'url(/images/wardrobe-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center left',
        }}
      />

      {/* Content */}
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container>
          <Grid item xs={12} md={6}></Grid>
          <Grid item xs={12}md={6}>
            <Box sx={{ textAlign: 'left'}}>
              <Typography
                variant="h2"
                sx={{
                  fontFamily: 'Playfair Display',
                  fontStyle: 'italic',
                  color: 'primary.main',
                  mb: 2,
                  fontWeight: 600
                }}
              >
                LeLook
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: '#6D5E52',
                  maxWidth: '500px',
                  mb: 5,
                  fontWeight: 500
                }}
              >
                Your wardrobe, reimagined – create, organize, and style effortlessly with your virtual closet.
              </Typography>

              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2,
                width: '400px' // Fixed width for button container
              }}>
                {/* Top row buttons container */}
                <Box sx={{ 
                  display: 'flex', 
                  gap: 2,
                  width: '100%'
                }}>
                  <Button
                    variant="contained"
                    startIcon={<Shirt />}
                    onClick={() => navigate('/outfits/create')}
                    sx={{
                      flex: 1,
                      bgcolor: '#AE9276',
                      color: 'white',
                      py: 1.5,
                      borderRadius: 28,
                    }}
                  >
                    CREATE OUTFIT
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<Plus />}
                    onClick={() => navigate('/items/add')}
                    sx={{
                      flex: 1,
                      bgcolor: '#AE9276',
                      color: 'white',
                      py: 1.5,
                      borderRadius: 28,
                    }}
                  >
                    ADD NEW ITEM
                  </Button>
                </Box>

                {/* Bottom full-width button */}
                <Button
                  variant="contained"
                  startIcon={<Wand />}
                  onClick={() => navigate('/ai-generate')}
                  sx={{
                    width: '100%',
                    bgcolor: 'primary.main',
                    color: 'white',
                    py: 1.5,
                    borderRadius: 28,
                  }}
                >
                  AI stylist
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Box
        sx={{
          position: 'absolute',
          bottom: 740,
          left: 0,
          p: 3,
          zIndex: 2
        }}
      >
        <Typography variant='h5' 
        sx={{
          fontFamily: 'Playfair Display',
          fontStyle: 'italic',
          color: 'primary.main',
          fontWeight: 600,
          mb: 1
          }}>
          Today's weather:
        </Typography>
        {weatherLoading ? (
          <Typography>Loading weather...</Typography>
        ) : weatherError ? (
          <Typography color="error">{weatherError}</Typography>
        ) : weather ? (
          <Typography variant="h6" sx={{ color: '#6D5E52' }}>
            {weather.temperature}°C - {weather.description}
          </Typography>
        ) : null}
      </Box>
    </Box>
  );
};

export default HomePage;