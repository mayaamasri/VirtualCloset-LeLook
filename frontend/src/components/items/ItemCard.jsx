import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  IconButton, 
  Menu, 
  MenuItem,
  Chip
} from '@mui/material';
import { MoreVertical, Edit2, Trash2 } from 'lucide-react';

const ItemCard = ({ item, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    
    // If it's already a full URL
    if (imagePath.startsWith('http')) {
      return imagePath;
    }

    const cleanPath = imagePath.replace(/^\/+/, '');
    
    return `${'http://localhost:4000'}/${cleanPath}`;
  };

  const getCategoryName = (item) => {
    return item.Category?.category_name || item.category_name || 'Uncategorized';
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        boxShadow: 4,
        bgcolor: '#d0c7b8',
        '&:hover': {
          boxShadow: 10
        }
      }}
    >
      <Box 
        sx={{ 
          position: 'relative',
          paddingTop: '100%',
          backgroundColor: 'secondary.main',
        }}
      >
        <Box
          component="img"
          src={getImageUrl(item.image_url)}
          alt={item.name}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8
          }}
          onClick={handleClick}
        >
          <MoreVertical size={20} />
        </IconButton>
      </Box>

      <CardContent sx={{ flexGrow: 1, pt: 2 }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {item.name}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
          <Chip 
            label={getCategoryName(item)}
            size="small"
            sx={{ bgcolor: 'primary.lighter' }}
          />
          <Chip 
            label={item.season} 
            size="small"
            sx={{ bgcolor: 'primary.lighter' }}
          />
          
          <Chip 
            label={item.color} 
            size="small"
            sx={{ bgcolor: 'primary.lighter' }}
          />
        </Box>
      </CardContent>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => {
          handleClose();
          onEdit(item);
        }}>
          <Edit2 size={16} style={{ marginRight: 8 }} />
          Edit
        </MenuItem>
        <MenuItem 
          onClick={() => {
            handleClose();
            onDelete(item);
          }}
          sx={{ color: 'error.main' }}
        >
          <Trash2 size={16} style={{ marginRight: 8 }} />
          Delete
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default ItemCard;