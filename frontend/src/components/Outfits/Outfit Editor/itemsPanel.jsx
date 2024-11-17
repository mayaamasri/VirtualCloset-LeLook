import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Grid, 
  InputAdornment 
} from '@mui/material';
import { Search } from 'lucide-react';
import { alpha } from '@mui/material/styles';

const ItemsPanel = ({ 
  items, 
  searchQuery, 
  onSearchChange, 
  onItemClick 
}) => {
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    const cleanPath = imagePath.replace(/^\/+/, '');
    return `${'http://localhost:4000'}/${cleanPath}`;
  };

  return (
    <Paper 
      elevation={3}
      sx={{ 
        p: 3, 
        height: '81vh', 
        display: 'flex', 
        flexDirection: 'column',
        backgroundColor: 'primary.main',
        borderRadius: 2
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontFamily: 'Inter',
          color: '#d0c7b8',
          mb: 2,
          textAlign: 'center'
        }}
      >
        Your Items
      </Typography>

      <TextField
        fullWidth
        placeholder="Search items..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ 
          mb: 3,
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
            backgroundColor: '#d0c7b8'
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search size={20} />
            </InputAdornment>
          ),
        }}
      />
      
      <Box sx={{ 
        flexGrow: 1, 
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          borderRadius: '4px',
          backgroundColor: alpha('#6D5E52', 0.1),
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: alpha('#6D5E52', 0.9),
          borderRadius: '4px',
          '&:hover': {
            backgroundColor: alpha('#6D5E52', 0.5),
          }
        }
      }}>
        <Grid container spacing={2}>
          {items.map((item) => (
            <Grid item xs={6} key={item.item_id}>
              <Paper
                onClick={() => onItemClick(item)}
                sx={{
                  p: 1.5,
                  cursor: 'pointer',
                  borderRadius: 2,
                  backgroundColor: '#d0c7b8',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    boxShadow: 4,
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#F8F8F8',
                    borderRadius: 1,
                    mb: 1
                  }}
                >
                  <img
                    src={getImageUrl(item.image_url)}
                    alt={item.name}
                    style={{
                      maxWidth: '90%',
                      maxHeight: '90%',
                      objectFit: 'contain'
                    }}
                  />
                </Box>
                <Typography 
                  variant="caption" 
                  display="block" 
                  textAlign="center"
                  sx={{ 
                    fontWeight: 500,
                    color: '#6D5E52'
                  }}
                >
                  {item.name}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
};

export default ItemsPanel;