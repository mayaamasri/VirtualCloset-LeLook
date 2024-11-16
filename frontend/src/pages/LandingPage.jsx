import React from 'react';
import { Box, Container, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/common/Logo';
import FeatureGrid from '../components/Landing/FeatureGrid';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Container>
        <Box sx={{ 
          pt: 16, 
          pb: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <Logo />
          <Stack 
            direction="row" 
            spacing={2} 
            sx={{ mt:3 }}
          >
            <Button
              variant="outlined"
              sx={{
                borderRadius: 28,
                px: 6,
                py: 1,
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  borderColor: 'primary.main'
                }
              }}
              onClick={() => navigate('/login')}
            >
              LOGIN
            </Button>
            <Button
              variant="contained"
              sx={{
                borderRadius: 28,
                px: 6,
                py: 1,
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': {
                  bgcolor: '#6e5f51'
                }
              }}
              onClick={() => navigate('/signup')}
            >
              SIGNUP
            </Button>
          </Stack>
        </Box>
        <FeatureGrid />
      </Container>
    </Box>
  );
};

export default LandingPage;
