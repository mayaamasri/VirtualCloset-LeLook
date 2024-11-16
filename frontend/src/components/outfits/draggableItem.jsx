import React, { useRef, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Minus, Plus, X } from 'lucide-react';
import { DraggableCore } from 'react-draggable';

const DraggableItem = ({ item, onDrag, onRemove, onResize }) => {
  const itemRef = useRef(null);
  const [showControls, setShowControls] = useState(false);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    const cleanPath = imagePath.replace(/^\/+/, '');
    return `${'http://localhost:4000'}/${cleanPath}`;
  };

  return (
    <Box
      ref={itemRef}
      className="draggable-item"
      sx={{
        position: 'absolute',
        left: item.position.x,
        top: item.position.y,
        zIndex: item.zIndex,
        transform: `scale(${item.scale})`,
        transformOrigin: 'top left'
      }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <Box
        sx={{
          position: 'relative',
          p: 1,
          '&:hover': {
            outline: '2px solid #6D5E52',
          }
        }}
      >
        {showControls && (
          <Box
            sx={{
              position: 'absolute',
              top: -40,
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'white',
              borderRadius: 1,
              boxShadow: 2,
              p: 0.5,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              zIndex: 1
            }}
          >
            <IconButton
              size="small"
              onClick={() => onResize(item.id, item.scale - 0.1)}
              disabled={item.scale <= 0.5}
            >
              <Minus size={16} />
            </IconButton>
            <Typography variant="caption" sx={{ minWidth: 40, textAlign: 'center' }}>
              {Math.round(item.scale * 100)}%
            </Typography>
            <IconButton
              size="small"
              onClick={() => onResize(item.id, item.scale + 0.1)}
              disabled={item.scale >= 2}
            >
              <Plus size={16} />
            </IconButton>
          </Box>
        )}

        <IconButton
          size="small"
          onClick={() => onRemove(item.id)}
          sx={{
            position: 'absolute',
            top: 4,
            right: 4,
            backgroundColor: 'white',
            opacity: showControls ? 1 : 0,
            transition: 'opacity 0.2s',
            '&:hover': { backgroundColor: '#f5f5f5' }
          }}
        >
          <X size={16} />
        </IconButton>

        <DraggableCore
          nodeRef={itemRef}
          onDrag={(e, data) => onDrag(item.id, data.deltaX, data.deltaY)}
        >
          <Box
            sx={{
              cursor: 'move',
              display: 'inline-block'
            }}
          >
            <img
              src={getImageUrl(item.image_url)}
              alt={item.name}
              style={{
                maxWidth: '200px',
                maxHeight: '200px',
                objectFit: 'contain'
              }}
            />
          </Box>
        </DraggableCore>
      </Box>
    </Box>
  );
};

export default DraggableItem;