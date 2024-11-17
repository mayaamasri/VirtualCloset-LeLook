import React from 'react';
import { Box, Typography, Chip, CardContent } from '@mui/material';

const OutfitDetails = ({ name, season, occasion, itemCount }) => (
<CardContent sx={{ flexGrow: 1, pt: 2 }}>
    <Typography variant="h6" color="text.secondary" gutterBottom>
      {name}
    </Typography>
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      <Chip
        label={season.toLowerCase() === "all_seasons" ? "All Seasons" : season}
        size="small"
        sx={{ bgcolor: 'primary.lighter' }}
      />
      <Chip
        label={occasion}
        size="small"
        sx={{ bgcolor: 'primary.lighter' }}
      />
      <Typography variant="body2" color="text.secondary">
        {itemCount || 0} items
      </Typography>
    </Box>
  </CardContent>
);

export default OutfitDetails;