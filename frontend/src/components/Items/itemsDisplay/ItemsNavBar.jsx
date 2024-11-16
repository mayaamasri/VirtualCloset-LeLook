import React from 'react';
import { Box, TextField, InputAdornment, Tabs, Tab, Button } from '@mui/material';
import { Search, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ItemsNavBar = ({ 
    searchQuery, 
    onSearchChange, 
    currentFilter, 
    onFilterChange,
    categories 
  }) => {
    const handleFilterChange = (event, newValue) => {
      console.log('Changing filter to:', newValue);
      onFilterChange(newValue);
    };
    const navigate = useNavigate();

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3 
      }}>
        <TextField
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{ width: 300 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={20} />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={() => navigate('/items/add')}
          sx={{
            px: 3,
            py: 2,
            bgcolor: 'primary.main',
            color: 'white',
            '&:hover': {
              bgcolor: 'primary.dark'
            }
          }}
        >
          Add Item
        </Button>
      </Box>

      <Tabs 
        value={currentFilter}
        onChange={handleFilterChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          '& .MuiTab-root': {
            textTransform: 'none',
            minWidth: 'auto',
            px: 3,
            py: 1,
            mr: 2,
            borderRadius: 28,
            color: 'text.secondary',
            '&.Mui-selected': {
              color: 'primary.main',
              bgcolor: 'primary.lighter',
            },
          },
          '& .MuiTabs-indicator': {
            display: 'none',
          },
        }}
      >
        <Tab label="All" value="all" />
        {categories.map((category) => (
          <Tab
            key={category.category_id}
            label={category.category_name}
            value={category.category_name.toLowerCase()}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default ItemsNavBar;