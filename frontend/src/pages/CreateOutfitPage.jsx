import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Grid, CircularProgress } from '@mui/material';
import html2canvas from 'html2canvas';
import ItemsPanel from '../components/Outfits/itemsPanel';
import OutfitCanvas from '../components/Outfits/outfitCanvas';
import OutfitDetailsForm from '../components/Outfits/outfitDetailsForm';
import ItemService from '../services/itemService';
import OutfitService from '../services/outfitService';

const CreateOutfitPage = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [outfitName, setOutfitName] = useState('');
  const [season, setSeason] = useState('');
  const [occasion, setOccasion] = useState('');
  const [error, setError] = useState('');
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await ItemService.getAllItemsByUserId(userId);
        setItems(response.data || []);
        setFilteredItems(response.data || []);
      } catch (err) {
        setError('Failed to load items');
        console.error('Error fetching items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

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

  const captureCanvasImage = async () => {
    if (!canvasRef.current) return null;

    try {
      const canvas = await html2canvas(canvasRef.current, {
        backgroundColor: null,
        useCORS: true,
        scale: 2, // Increase quality
        logging: true, // Helpful for debugging
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

  const handleSaveOutfit = async () => {
    try {
        const canvasImage = await captureCanvasImage();
        if (!canvasImage) {
            throw new Error('Failed to capture outfit image');
        }

        const formData = new FormData();
        
        // Make sure all these fields exist and have values
        if (!outfitName || !occasion || !season) {
            throw new Error('Please fill in all required fields');
        }

        formData.append('name', outfitName);
        formData.append('occasion', occasion);
        formData.append('season', season);
        formData.append('user_id', localStorage.getItem('userId'));
        formData.append('image', canvasImage, 'outfit.png');

        // Prepare items data
        const itemsData = selectedItems.map(item => ({
          item_id: item.item_id, // Use item_id instead of id
          position: item.position,
          scale: item.scale,
          position_index: item.zIndex // If you want to use zIndex as position_index
      }));
      formData.append('items', JSON.stringify(itemsData));

        const response = await OutfitService.createOutfit(formData);
        navigate(`/outfits`)
        
    } catch (error) {
        console.error('Error saving outfit:', error);
        // Handle error...
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
      <Box sx={{ 
        py: 6
      }}>

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
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CreateOutfitPage;