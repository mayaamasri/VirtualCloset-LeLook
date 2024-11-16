import React, { useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { Upload } from 'lucide-react';

const ImageUpload = ({ onImageSelect, currentImageUrl }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        setIsProcessing(true);
        setError(null);

        const reader = new FileReader();
        reader.onload = () => {
          setPreviewUrl(reader.result);
          setIsProcessing(false);
        };
        reader.onerror = () => {
          setError('Failed to load image');
          setIsProcessing(false);
        };
        reader.readAsDataURL(file);

        onImageSelect(file);
      } catch (err) {
        console.error('Error handling image:', err);
        setError('Failed to process image');
        setIsProcessing(false);
      }
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: 300,
        border: '2px dashed',
        borderColor: error ? 'error.main' : 'primary.main',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        mb: 3
      }}
    >
      <input
        accept="image/*"
        type="file"
        onChange={handleImageChange}
        disabled={isProcessing}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0,
          cursor: isProcessing ? 'not-allowed' : 'pointer',
          zIndex: 1
        }}
      />
      
      {isProcessing ? (
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={40} color="primary" />
          <Typography variant="body1" color="primary" mt={2}>
            Processing image...
          </Typography>
        </Box>
      ) : previewUrl || currentImageUrl ? (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <Box
            component="img"
            src={previewUrl || currentImageUrl}
            alt="Preview"
            sx={{
              maxWidth: '90%',
              maxHeight: '90%',
              objectFit: 'contain',
              display: 'block'
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 8,
              width: '100%',
              textAlign: 'center',
              color: 'text.secondary',
              zIndex: 0
            }}
          >
            Click or drag to replace image
          </Box>
        </Box>
      ) : (
        <Box sx={{ textAlign: 'center', zIndex: 0 }}>
          <Upload size={40} color="#6D5E52" />
          <Typography variant="body1" color="primary" mt={2}>
            Click or drag image to upload
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            Supports: JPG, PNG (Max 5MB)
          </Typography>
        </Box>
      )}
      
      {error && (
        <Typography 
          color="error" 
          variant="body2" 
          sx={{ 
            position: 'absolute', 
            bottom: 8, 
            width: '100%', 
            textAlign: 'center',
            px: 2
          }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default ImageUpload;