import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Stack,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import ImageUpload from './ImageUpload';
import ItemService from '../../services/itemService';
import CategoryService from '../../services/categoryService';

const colorOptions = [
  'Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 
  'Purple', 'Pink', 'Orange', 'Brown', 'Gray', 'Beige'
];

const seasonOptions = ['Spring', 'Summer', 'Fall', 'Winter', 'All Seasons'];

const EditItemForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    color: '',
    season: '',
    image: null
  });

  useEffect(() => {
    const fetchItemAndCategories = async () => {
      try {
        const [itemResponse, categoriesResponse] = await Promise.all([
          ItemService.getItemById(id),
          CategoryService.getAllCategories()
        ]);
  
        setCategories(categoriesResponse.data);
        const item = itemResponse.data;
        
        // Debug logs
        console.log('API Item Response:', item);
        console.log('Categories Response:', categoriesResponse.data);
  
        // Set the current image URL from the API response
        const imageUrl = item.image_url;
        if (imageUrl) {
          setCurrentImageUrl(imageUrl.startsWith('http') 
            ? imageUrl 
            : `${'http://localhost:4000'}/${imageUrl.replace(/^\/+/, '')}`
          );
        }
  
        // Find category name by matching category_id with categories
        let categoryName = '';
        if (item.category_id) {
          const category = categoriesResponse.data.find(
            cat => cat.category_id === item.category_id
          );
          categoryName = category ? category.category_name : '';
        }
  
        const formDataToSet = {
          name: item.name || '',
          category: categoryName,
          color: item.color || '',
          season: item.season || '',
          image: null
        };
  
        console.log('Setting form data:', formDataToSet);
        setFormData(formDataToSet);
  
      } catch (err) {
        console.error('Error fetching item:', err);
        setError('Failed to load item details');
      } finally {
        setLoading(false);
      }
    };
  
    fetchItemAndCategories();
  }, [id]);

  const handleImageSelect = (file) => {
    setFormData(prev => ({
      ...prev,
      image: file
    }));
    setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      await ItemService.updateItem(id, formData);
      navigate('/items');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update item');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: 400 
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 3 }}
    >
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
        Edit Item
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Stack spacing={3}>
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Image
          </Typography>
          <ImageUpload
            onImageSelect={handleImageSelect}
            currentImageUrl={currentImageUrl}
          />
        </Box>

        <TextField
          fullWidth
          label="Item Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <FormControl fullWidth required>
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={formData.category}
            onChange={handleChange}
            label="Category"
          >
            {categories.map((category) => (
              <MenuItem 
                key={category.category_id} 
                value={category.category_name}
              >
                {category.category_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Color
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {colorOptions.map((color) => (
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
        </Box>

        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Season
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {seasonOptions.map((season) => (
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
        </Box>

        <Stack 
          direction="row" 
          spacing={2} 
          justifyContent="flex-end"
          sx={{ mt: 4 }}
        >
          <Button
            variant="outlined"
            onClick={() => navigate('/items')}
            sx={{
              borderRadius: 28,
              px: 4
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={submitting}
            sx={{
              borderRadius: 28,
              px: 4,
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'primary.dark'
              }
            }}
          >
            {submitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default EditItemForm;