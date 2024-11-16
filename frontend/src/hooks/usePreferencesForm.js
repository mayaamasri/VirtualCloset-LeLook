import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserPreferenceService from '../services/userPrefService';

const initialFormState = {
  preferred_style: '',
  favorite_colors: [],
  preferred_fit: '',
  weather_sensitivity: false
};

export const usePreferencesForm = (mode = 'create') => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(mode === 'edit');

  useEffect(() => {
    const fetchPreferences = async () => {
      if (mode === 'edit') {
        try {
          const response = await UserPreferenceService.getPreferences(userId);
          if (response.data) {
            setFormData(response.data);
          }
        } catch (err) {
          setError('Failed to load preferences');
          console.error('Error fetching preferences:', err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchPreferences();
  }, [mode, userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleWeatherToggle = (e) => {
    setFormData(prev => ({
      ...prev,
      weather_sensitivity: e.target.checked
    }));
  };

  const handleColorSelect = (color) => {
    setFormData(prev => ({
      ...prev,
      favorite_colors: prev.favorite_colors.includes(color)
        ? prev.favorite_colors.filter(c => c !== color)
        : [...prev.favorite_colors, color]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (mode === 'edit') {
        await UserPreferenceService.updatePreferences(userId, formData);
      } else {
        await UserPreferenceService.createPreferences({ ...formData, user_id: userId });
      }
      navigate('/homepage');
    } catch (err) {
      setError(err.response?.data?.error || `Failed to ${mode} preferences`);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    error,
    isLoading,
    handleChange,
    handleWeatherToggle,
    handleColorSelect,
    handleSubmit,
    navigate
  };
};
