import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Grid,
} from "@mui/material";
import { Sparkles, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import WeatherOccasionForm from "./weatherocc";
import AiService from "../services/aiService";

// AiSuggestions component
const AiSuggestions = ({ userItems, userPreferences }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState(null);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState("");
  const [occasion, setOccasion] = useState("");

  // Function to generate outfit suggestion
  const handleGenerateSuggestion = async () => {
    if (!weather || !occasion) {
      setError("Please select both weather and occasion");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Parameters for the AI service
      const params = {
        items: userItems,
        preferences: userPreferences,
        weather,
        occasion,
      };

      const response = await AiService.generateOutfitSuggestion(params);
      setSuggestion(response);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Failed to generate suggestion. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Function to create outfit from suggestion
  const handleCreateOutfit = () => {
    if (suggestion?.selected_items) {
      // Store selected items in sessionStorage for the outfit creation page
      sessionStorage.setItem(
        "aiSuggestedItems",
        JSON.stringify(suggestion.selected_items)
      );
      navigate("/outfits/create");
    }
  };

  // Function to get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;
    const cleanPath = imagePath.replace(/^\/+/, "");
    return `http://localhost:4000/${cleanPath}`;
  };

  return (
    <Box sx={{ maxWidth: "4xl", mx: "100px" }}>
      <Paper sx={{ p: 4, borderRadius: 2, bgcolor: "white" }}>
        <WeatherOccasionForm
          weather={weather}
          occasion={occasion}
          onWeatherChange={(e) => setWeather(e.target.value)}
          onOccasionChange={(e) => setOccasion(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleGenerateSuggestion}
          disabled={loading || !weather || !occasion}
          startIcon={<Sparkles />}
          fullWidth
          sx={{
            py: 2,
            mt: 3,
            borderRadius: 28,
            bgcolor: "primary.main",
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          {loading ? "Creating your outfit..." : "Get AI Suggestion"}
        </Button>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {loading && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              py: 4,
            }}
          >
            <CircularProgress size={40} />
            <Typography sx={{ mt: 2, color: "text.secondary" }}>
              Creating your perfect outfit...
            </Typography>
          </Box>
        )}

        {suggestion && (
          <Box sx={{ mt: 4 }}>
            <Box
              sx={{ bgcolor: "secondary.light", p: 3, borderRadius: 2, mb: 3 }}
            >
              <Typography variant="h6" gutterBottom>
                Your Outfit
              </Typography>
              <Typography>{suggestion.description}</Typography>
            </Box>

            {suggestion.selected_items?.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6">Selected Items</Typography>
                  {}
                  <Button
                    variant="contained"
                    onClick={handleCreateOutfit}
                    startIcon={<PlusCircle />}
                    sx={{
                      borderRadius: 28,
                      bgcolor: "primary.main",
                      "&:hover": { bgcolor: "primary.dark" },
                    }}
                  >
                    Create This Outfit
                  </Button>
                </Box>
                <Grid container spacing={2}>
                  {suggestion.selected_items.map((item) =>
                    item && item.item_id ? (
                      <Grid item xs={12} sm={6} md={4} key={item.item_id}>
                        <Paper sx={{ p: 2 }}>
                          <Box
                            component="img"
                            src={getImageUrl(item.image_url)}
                            alt={item.name || "Item image"}
                            sx={{
                              width: "100%",
                              height: 200,
                              objectFit: "contain",
                              mb: 2,
                            }}
                          />
                          <Typography variant="subtitle1">
                            {item.name || "Unnamed item"}
                          </Typography>
                        </Paper>
                      </Grid>
                    ) : null
                  )}
                </Grid>
              </Box>
            )}

            <Box
              sx={{ mt: 4, bgcolor: "primary.lighter", p: 3, borderRadius: 2 }}
            >
              <Typography variant="h6" gutterBottom>
                Styling Tips
              </Typography>
              <Typography>{suggestion.styling_tips}</Typography>
            </Box>

            <Box sx={{ mt: 4, bgcolor: "info.lighter", p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Weather Considerations
              </Typography>
              <Typography>{suggestion.weather_notes}</Typography>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default AiSuggestions;
