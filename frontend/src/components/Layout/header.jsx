import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, IconButton, Avatar, Menu, MenuItem, Button } from '@mui/material';
import { Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/authService';

const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [userName, setUserName] = useState('');
  const open = Boolean(anchorEl);

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

  const handleSettingsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePreferences = () => {
    handleClose();
    navigate('/preferences/edit');
  };

  const handleLogout = () => {
    handleClose();
    AuthService.logout();
    navigate('/login');
  };

  return (
    <Box 
      sx={{ 
        bgcolor: 'primary.main', 
        boxShadow: '0 4px 4px rgba(0,0,0,0.05)',
        position: 'sticky',
        zIndex: 1000,
        top: 0,
        width: '100%'
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          height: 65,
        }}>
          <Typography
            variant="h1"
            sx={{
              fontFamily: 'Playfair Display',
              fontSize: { xs: '2rem', md: '2rem' },
              fontStyle: 'italic',
              color: 'secondary.main',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/homepage')}
          >
            Lelook
          </Typography>

          <Box sx={{ 
            display: 'flex', 
            gap: 2,
            flex: 1,
            justifyContent: 'center'
          }}>
            <Button 
              color="inherit" 
              onClick={() => navigate('/homepage')}
              sx={{ 
                color: 'secondary.main',
                '&:hover': { color: 'secondary.main' }
              }}
            >
              Homepage
            </Button>
            <Button 
              color="inherit" 
              onClick={() => navigate('/outfits')}
              sx={{ 
                color: 'secondary.main',
                '&:hover': { color: 'secondary.main' }
              }}
            >
              My Fits
            </Button>
            <Button 
              color="inherit" 
              onClick={() => navigate('/items')}
              sx={{ 
                color: 'secondary.main',
                '&:hover': { color: 'secondary.main' }
              }}
            >
              My Items
            </Button>
          </Box>

          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2 
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1 
            }}>
              <Avatar
                sx={{ 
                  bgcolor: 'secondary.main',
                  width: 35,
                  height: 35,
                  color: 'primary.main'
                }}
              >
                {userName.charAt(0)}
              </Avatar>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  color: 'secondary.main'
                }}
              >
                {userName}
              </Typography>
            </Box>
            <IconButton 
              color="secondary" 
              size="large"
              onClick={handleSettingsClick}
              aria-controls={open ? 'settings-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Settings />
            </IconButton>
            <Menu
              id="settings-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'settings-button',
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handlePreferences}>
                <Settings size={18} style={{ marginRight: 8 }} />
                Preferences
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <LogOut size={18} style={{ marginRight: 8 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;