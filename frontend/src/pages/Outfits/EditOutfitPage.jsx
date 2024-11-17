import React, { useRef } from 'react';
import { Box, Container, Typography, Grid, CircularProgress, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useOutfitEditor } from '../../hooks/useOutfitEditor';
import { useOutfitData } from '../../hooks/useOutfitsData';
import { captureCanvas } from '../../utils/canvasUtils';
import OutfitService from '../../services/outfitService';
import ItemsPanel from '../../components/Outfits/Outfit Editor/itemsPanel';
import OutfitCanvas from '../../components/Outfits/Outfit Editor/outfitCanvas';
import OutfitDetailsForm from '../../components/Outfits/Outfit Editor/outfitDetailsForm';

const EditOutfitPage = () => {
  const { id: outfitId } = useParams();
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const { outfitData, loading: outfitLoading, error: outfitError } = useOutfitData(outfitId);

  const {
    loading: editorLoading,
    items,
    selectedItems,
    searchQuery,
    formData,
    error: editorError,
    setSearchQuery,
    handleAddItem,
    handleDrag,
    handleResize,
    handleRemoveItem,
    handleFormChange
  } = useOutfitEditor(outfitData);

  const handleSave = async () => {
    try {
      const canvasImage = await captureCanvas(canvasRef);
      if (!canvasImage) {
        throw new Error('Failed to capture outfit image');
      }

      const formDataObj = new FormData();
      formDataObj.append('name', formData.outfitName);
      formDataObj.append('occasion', formData.occasion);
      formDataObj.append('season', formData.season);
      formDataObj.append('image', canvasImage, 'outfit.png');

      const itemsData = selectedItems.map(item => ({
        item_id: item.id,
        position: item.position,
        scale: item.scale,
        position_index: item.zIndex
      }));
      formDataObj.append('items', JSON.stringify(itemsData));

      await OutfitService.updateOutfit(outfitId, formDataObj);
      navigate('/outfits');
    } catch (error) {
      console.error('Error updating outfit:', error);
    }
  };

  if (outfitLoading || editorLoading) {
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

        {(outfitError || editorError) && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {outfitError || editorError}
          </Alert>
        )}

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
              isEditing={true}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default EditOutfitPage;