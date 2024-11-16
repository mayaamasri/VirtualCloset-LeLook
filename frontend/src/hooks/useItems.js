import { useState, useEffect } from 'react';
import ItemService from '../services/itemService';
import CategoryService from '../services/categoryService';

export const useItems = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userId = localStorage.getItem('userId');
        
        const [itemsResponse, categoriesResponse] = await Promise.all([
          ItemService.getAllItemsByUserId(userId),
          CategoryService.getAllCategories()
        ]);

        if (itemsResponse.data) {
          setItems(itemsResponse.data);
        }
        if (categoriesResponse.data) {
          setCategories(categoriesResponse.data);
        }

        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Failed to load items');
        setItems([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteItem = async (itemId) => {
    try {
      await ItemService.deleteItem(itemId);
      setItems(prevItems => prevItems.filter(item => item.item_id !== itemId));
      return true;
    } catch (err) {
      console.error('Failed to delete item:', err);
      setError('Failed to delete item');
      return false;
    }
  };

  return { items, setItems, categories, loading, error, handleDeleteItem };
};
