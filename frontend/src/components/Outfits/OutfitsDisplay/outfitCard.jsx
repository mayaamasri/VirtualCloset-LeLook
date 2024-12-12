import React, { useState } from 'react';
import { Card } from '@mui/material';
import OutfitImage from './outfitImage';
import OutfitDetails from './outfitDetails';
import OutfitCardMenu from './outfitCardMenu';

// OutfitCard component
const OutfitCard = ({ outfit, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Handle menu click
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        boxShadow: 4,
        bgcolor: '#d0c7b8',
        '&:hover': {
          boxShadow: 10
        }
      }}>
        {/* Outfit image */}
        <OutfitImage
          imageUrl={outfit.image_url}
          name={outfit.name}
          onMenuClick={handleMenuClick}
        />
        {/* Outfit details */}
        <OutfitDetails
          name={outfit.name}
          season={outfit.season}
          occasion={outfit.occasion}
          itemCount={outfit.ClothingItems?.length}
        />
        {/* Outfit card menu */}
        <OutfitCardMenu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </Card>
  );
};

export default OutfitCard;