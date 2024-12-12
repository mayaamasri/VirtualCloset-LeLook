import React from "react";
import { Stack } from "@mui/material";
import { StyleSelect } from "./StyleSelect";
import { ColorSelect } from "./ColorSelect";
import { FitSelect } from "./FitSelect";
import { WeatherToggle } from "./WeatherToggle";

// Fields component
export const Fields = ({
  formData,
  handleChange,
  handleColorSelect,
  handleWeatherToggle,
  isLoading,
}) => (
  <Stack spacing={3}>
    {/* Style select */}
    <StyleSelect
      value={formData.preferred_style}
      onChange={handleChange}
      disabled={isLoading}
    />
    {/* Color select */}
    <ColorSelect
      selectedColors={formData.favorite_colors}
      onColorSelect={handleColorSelect}
    />
    {/* Fit select */}
    <FitSelect
      value={formData.preferred_fit}
      onChange={handleChange}
      disabled={isLoading}
    />
    {/* Weather toggle */}
    <WeatherToggle
      checked={formData.weather_sensitivity}
      onChange={handleWeatherToggle}
    />
  </Stack>
);
