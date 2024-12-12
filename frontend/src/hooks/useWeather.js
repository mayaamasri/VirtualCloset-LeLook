import { useState, useEffect } from 'react';
import axios from 'axios';

const WEATHER_API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

export const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async (latitude, longitude) => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
        );

        const weatherData = {
          temperature: Math.round(response.data.main.temp),
          condition: response.data.weather[0].main.toLowerCase(),
          description: response.data.weather[0].description,
          icon: response.data.weather[0].icon
        };

        setWeather(weatherData);
        setError(null);
      } catch (err) {
        console.error('Error fetching weather:', err);
        setError('Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    const getUserLocation = () => {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by your browser');
        setLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          console.error('Geolocation error:', err);
          setError('Unable to get your location');
          setLoading(false);
        }
      );
    };

    getUserLocation();
  }, []);

  return { weather, loading, error };
};