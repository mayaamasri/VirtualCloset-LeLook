// useOutfitsData.js
import { useState, useEffect } from 'react';
import OutfitService from '../services/outfitService';

export const useOutfitData = (outfitId) => {
  const [outfitData, setOutfitData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

useEffect(() => {
  const fetchOutfit = async () => {
    try {
      const response = await OutfitService.getOutfitById(outfitId);
      const outfit = response.data;

      const outfitItems = outfit.ClothingItems.map(item => ({
        id: item.item_id,
        ...item,
        position: item.OutfitItems?.position || { x: 0, y: 0 },
        scale: item.OutfitItems?.scale || 1,
        zIndex: item.OutfitItems?.position_index || 0
      }));

      setOutfitData({
        name: outfit.name,
        season: outfit.season,
        occasion: outfit.occasion,
        items: outfitItems
      });
    } catch (err) {
      console.error('Error fetching outfit:', err);
      setError('Failed to load outfit details');
    } finally {
      setLoading(false);
    }
  };

  if (outfitId) {
    fetchOutfit();
  }
}, [outfitId]);
  return { outfitData, loading, error };
};