// pages/EditOutfitPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  CircularProgress, 
  Alert 
} from '@mui/material';
import html2canvas from 'html2canvas';
import ItemsPanel from '../components/outfits/itemsPanel';
import OutfitCanvas from '../components/outfits/outfitCanvas';
import OutfitDetailsForm from '../components/outfits/outfitDetailsForm';
import ItemService from '../services/itemService';
import OutfitService from '../services/outfitService';

const EditOutfitPage = () => {
  const { id: outfitId } = useParams();
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [outfitName, setOutfitName] = useState('');
  const [season, setSeason] = useState('');
  const [occasion, setOccasion] = useState('');
  const [error, setError] = useState('');

  // Fetch outfit and items data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userId = localStorage.getItem('userId');
        
        // Fetch all available items
        const itemsResponse = await ItemService.getAllItemsByUserId(userId);
        setItems(itemsResponse.data || []);
        setFilteredItems(itemsResponse.data || []);

        // Fetch outfit details
        const outfitResponse = await OutfitService.getOutfitById(outfitId);
        const outfit = outfitResponse.data;

        // Set outfit details
        setOutfitName(outfit.name);
        setSeason(outfit.season);
        setOccasion(outfit.occasion);

        // Transform outfit items to the format expected by canvas
        const outfitItems = outfit.ClothingItems.map(item => ({
          id: item.item_id,
          ...item,
          position: item.position || { x: 0, y: 0 },
          scale: item.scale || 1,
          zIndex: item.position_index || 0
        }));
        setSelectedItems(outfitItems);

      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load outfit details');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [outfitId]);

  // Filter items based on search
  useEffect(() => {
    const filtered = items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchQuery, items]);

  const handleAddItem = (item) => {
    const newItem = {
      id: item.item_id,
      ...item,
      position: { x: 0, y: 0 },
      zIndex: selectedItems.length,
      scale: 1
    };
    setSelectedItems(prev => [...prev, newItem]);
  };

  const handleDrag = (itemId, deltaX, deltaY) => {
    setSelectedItems(prev => prev.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          position: {
            x: item.position.x + deltaX,
            y: item.position.y + deltaY
          },
          zIndex: Math.max(...prev.map(i => i.zIndex)) + 1
        };
      }
      return item;
    }));
  };

  const handleResize = (itemId, newScale) => {
    const scale = Math.min(Math.max(newScale, 0.5), 2);
    setSelectedItems(prev => prev.map(item => 
      item.id === itemId
        ? { ...item, scale }
        : item
    ));
  };

  const handleRemoveItem = (itemId) => {
    setSelectedItems(prev => prev.filter(item => item.id !== itemId));
  };

  const captureCanvasImage = async () => {
    if (!canvasRef.current) return null;

    try {
      const canvas = await html2canvas(canvasRef.current, {
        backgroundColor: null,
        useCORS: true,
        scale: 2,
        logging: true,
      });

      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/png', 0.95);
      });
    } catch (error) {
      console.error('Error capturing canvas:', error);
      return null;
    }
  };

  const handleSaveOutfit = async () => {
    try {
      const canvasImage = await captureCanvasImage();
      if (!canvasImage) {
        throw new Error('Failed to capture outfit image');
      }

      if (!outfitName || !occasion || !season) {
        throw new Error('Please fill in all required fields');
      }

      const formData = new FormData();
      formData.append('name', outfitName);
      formData.append('occasion', occasion);
      formData.append('season', season);
      formData.append('image', canvasImage, 'outfit.png');

      // Prepare items data
      const itemsData = selectedItems.map(item => ({
        item_id: item.id,
        position: item.position,
        scale: item.scale,
        position_index: item.zIndex
      }));
      formData.append('items', JSON.stringify(itemsData));

      await OutfitService.updateOutfit(outfitId, formData);
      navigate('/outfits');
    } catch (error) {
      console.error('Error updating outfit:', error);
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 2, minHeight: '100vh' }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'Playfair Display',
            fontStyle: 'italic',
            color: 'primary.main',
            mb: 2,
            textAlign: 'center'
          }}
        >
          Edit Outfit
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <ItemsPanel
              items={filteredItems}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onItemClick={handleAddItem}
            />
          </Grid>

          <Grid item xs={12} md={9}>
            <OutfitCanvas
              canvasRef={canvasRef}
              selectedItems={selectedItems}
              onDrag={handleDrag}
              onRemove={handleRemoveItem}
              onResize={handleResize}
            />

            <OutfitDetailsForm
              outfitName={outfitName}
              season={season}
              occasion={occasion}
              onNameChange={setOutfitName}
              onSeasonChange={setSeason}
              onOccasionChange={setOccasion}
              onSave={handleSaveOutfit}
              isEditing={true}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default EditOutfitPage;