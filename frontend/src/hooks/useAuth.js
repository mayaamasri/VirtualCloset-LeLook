import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';

export const useAuth = (type = 'login') => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = async (formData) => {
    setError('');
    setIsLoading(true);

    try {
      const data = await AuthService.login(formData);
      
      if (data.user?.user_id) {
        localStorage.setItem('userId', data.user.user_id);
      } else {
        throw new Error('User ID not received from server');
      }

      const hasPreferences = await AuthService.checkUserPreferences(data.user.user_id);
      navigate(hasPreferences ? '/homepage' : '/preferences');
    } catch (err) {
      console.error('Login error', err);
      setError(err.response?.data?.error || err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupSubmit = async (formData) => {
    setError('');
    setIsLoading(true);

    try {
      await AuthService.register(formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    error,
    isLoading,
    handleSubmit: type === 'login' ? handleLoginSubmit : handleSignupSubmit
  };
};