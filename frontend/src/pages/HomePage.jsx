import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Paper, Button} from '@mui/material';
import { Shirt, Plus, Sun, Search, Icon} from 'lucide-react';
import {coatHanger} from '@lucide/lab';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';

const Homepage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [greeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  });

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (userId) {
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
    <Container maxWidth="xl" sx={{ pt: 4 }}>
      <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: 'Playfair Display',
              fontStyle: 'italic',
              color: 'primary.main',
            }}
          >
            {greeting}, {userName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Let's find the perfect outfit for today
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                height: '100%',
                bgcolor: '#D0C7B8',
                color: 'white',
                borderRadius: 4
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Typography variant="h6">Today's Weather</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, alignItems:'center' }}>
              <Sun size={32}/>
              <Typography variant="h4">75°F</Typography>
              </Box>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  bgcolor: 'white',
                  color: 'primary.main',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
                }}
              >
                See Weather-Based Suggestions
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%', borderRadius: 4}}>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>Quick Actions</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                <Button
                fullWidth
                variant="outlined"
                startIcon={<Plus />}
                onClick={() => navigate('/items/add')}
                sx={{ height: '100%', borderRadius: 3, py:2, bgcolor: '#d0c7b8', color: 'white' }}
                >
                Add New Item
                </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Shirt />}
                    onClick={() => navigate('/outfits/create')}
                    sx={{ height: '100%', borderRadius: 3, py:2, bgcolor: '#d0c7b8', color: 'white' }}
                  >
                    Create Outfit
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Search />}
                    sx={{ height: '100%', py: 2, borderRadius: 3,  bgcolor: '#d0c7b8', color: 'white' }}
                  >
                    Browse Fits
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Icon iconNode = {coatHanger} />}
                    onClick={() => navigate('/items')}
                    sx={{ height: '100%', py: 2, borderRadius: 3,  bgcolor: '#d0c7b8', color: 'white'  }}
                  >
                    Browse Closet
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        <Box>
          <Grid container spacing={3}>
            {[1, 2, 3].map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item}>
                <Paper
                  sx={{
                    borderRadius: 4,
                    height: 200,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'white'
                  }}
                >
                  <Typography color="text.secondary">
                    Outfit Preview {item}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
  );
};

export default Homepage;