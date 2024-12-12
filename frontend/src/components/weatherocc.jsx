import React from "react";
import { Box, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import { Cloud, Sun, CloudRain, Snowflake } from "lucide-react";

const weatherOptions = [
  { value: "sunny", label: "Sunny", icon: Sun },
  { value: "cloudy", label: "Cloudy", icon: Cloud },
  { value: "rainy", label: "Rainy", icon: CloudRain },
  { value: "snowy", label: "Snowy", icon: Snowflake },
];

const occasionOptions = [
  "Casual",
  "Business",
  "Formal",
  "Date Night",
  "Party",
  "Sport/Workout",
  "Beach",
  "Travel",
];

// WeatherOccasionForm component
const WeatherOccasionForm = ({
  weather,
  occasion,
  onWeatherChange,
  onOccasionChange,
}) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        gap: 2,
      }}
    >
      {/* Weather and Occasion form */}
      <FormControl fullWidth>
        <InputLabel>Weather</InputLabel>
        <Select value={weather} onChange={onWeatherChange} label="Weather">
          {weatherOptions.map((option) => {
            const Icon = option.icon;
            return (
              <MenuItem key={option.value} value={option.value}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Icon size={20} />
                  {option.label}
                </Box>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      {/* WeatherOccasionForm component */}
      <FormControl fullWidth>
        <InputLabel>Occasion</InputLabel>
        <Select value={occasion} onChange={onOccasionChange} label="Occasion">
          {occasionOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default WeatherOccasionForm;
