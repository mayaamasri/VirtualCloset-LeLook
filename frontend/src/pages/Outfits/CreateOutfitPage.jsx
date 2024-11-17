import React, { useRef } from 'react';
import { Box, Container, Grid, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useOutfitEditor } from '../../hooks/useOutfitEditor';
import { captureCanvas } from '../../utils/canvasUtils';
import OutfitService from '../../services/outfitService';
import ItemsPanel from '../../components/Outfits/Outfit Editor/itemsPanel';
import OutfitCanvas from '../../components/Outfits/Outfit Editor/outfitCanvas';
import OutfitDetailsForm from '../../components/Outfits/Outfit Editor/outfitDetailsForm';

const CreateOutfitPage = () => {
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const {
    loading,
    items,
    selectedItems,
    searchQuery,
    formData,
    error,
    setSearchQuery,
    handleAddItem,
    handleDrag,
    handleResize,
    handleRemoveItem,
    handleFormChange
  } = useOutfitEditor();

  const handleSave = async () => {
    try {
      const canvasImage = await captureCanvas(canvasRef);
      if (!canvasImage) {
        throw new Error('Failed to capture outfit image');
      }

      if (!formData.outfitName || !formData.occasion || !formData.season) {
        throw new Error('Please fill in all required fields');
      }

      const formDataObj = new FormData();
      formDataObj.append('name', formData.outfitName);
      formDataObj.append('occasion', formData.occasion);
      formDataObj.append('season', formData.season);
      formDataObj.append('user_id', localStorage.getItem('userId'));
      formDataObj.append('image', canvasImage, 'outfit.png');

      const itemsData = selectedItems.map(item => ({
        item_id: item.id,
        position: item.position,
        scale: item.scale,
        position_index: item.zIndex
      }));
      formDataObj.append('items', JSON.stringify(itemsData));

      await OutfitService.createOutfit(formDataObj);
      navigate('/outfits');
    } catch (error) {
      console.error('Error saving outfit:', error);
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
      <Box sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <ItemsPanel
              items={items}
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
              formData={formData}
              onChange={handleFormChange}
              onSave={handleSave}
              isEditing={false}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CreateOutfitPage;