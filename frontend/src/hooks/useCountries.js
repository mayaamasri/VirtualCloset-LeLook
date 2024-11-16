import { useState, useEffect } from 'react';
import CountryService from '../services/countryService';

export const useCountries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await CountryService.getAll();
        setCountries(response.data);
      } catch (err) {
        setError('Unable to load countries. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { countries, loading, error };
};