import React from 'react';
import { Box, IconButton } from '@mui/material';
import { MoreVertical } from 'lucide-react';
import { getImageUrl } from '../../../utils/imageUtils';

// OutfitImage component
const OutfitImage = ({ imageUrl, name, onMenuClick }) => (
  <Box sx={{ 
    position: 'relative', 
    paddingTop: '100%', 
    backgroundColor: 'secondary.main' 
  }}>
    {/* Image */}
    <Box
      component="img"
      src={getImageUrl(imageUrl)}
      alt={name}
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '107%',
        height: '100%',
        objectFit: 'contain'
      }}
    />
    {/* Menu button */}
    <IconButton
      sx={{
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 1
      }}
      onClick={onMenuClick}
    >
      <MoreVertical size={20} />
    </IconButton>
  </Box>
);

export default OutfitImage;