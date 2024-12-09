import { useState, useEffect } from 'react';
import ItemService from '../services/itemService';

export const useOutfitEditor = (initialOutfit = null) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    outfitName: initialOutfit?.name || '',
    season: initialOutfit?.season || '',
    occasion: initialOutfit?.occasion || ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialOutfit) {
      setFormData({
        outfitName: initialOutfit.name,
        season: initialOutfit.season,
        occasion: initialOutfit.occasion
      });
      setSelectedItems(initialOutfit.items || []);
    }
  }, [initialOutfit]);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    const filtered = items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchQuery, items]);

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

  const handleResize = (itemId, newScale) => {
    const scale = Math.min(Math.max(newScale, 0.5), 2);
    setSelectedItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, scale } : item
    ));
  };

  const handleRemoveItem = (itemId) => {
    setSelectedItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return {
    loading,
    items: filteredItems,
    selectedItems,
    searchQuery,
    formData,
    error,
    setSearchQuery,
    setSelectedItems,
    handleAddItem,
    handleDrag,
    handleResize,
    handleRemoveItem,
    handleFormChange
  };
};