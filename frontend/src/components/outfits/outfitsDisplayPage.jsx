import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import OutfitService from "../../services/outfitService";
import OutfitCard from "./outfitCard";
import OutfitsFilter from "./outfitsFilter";
import { useNavigate } from "react-router-dom";

const OutfitsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [outfits, setOutfits] = useState([]);
  const [filteredOutfits, setFilteredOutfits] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    season: "all",
    occasion: "all",
  });

  useEffect(() => {
    fetchOutfits();
  }, []);

  const fetchOutfits = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      console.log("Fetching outfits for user:", userId);

      const response = await OutfitService.getOutfitsByUserId(userId);
      console.log("Outfits response:", response);

      if (response?.data?.outfits) {
        setOutfits(response.data.outfits);
        setFilteredOutfits(response.data.outfits);
      } else {
        console.log("No outfits found in response");
        setOutfits([]);
        setFilteredOutfits([]);
      }
    } catch (err) {
      console.error("Error fetching outfits:", err);
      setError(err?.response?.data?.error || "Failed to load outfits");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!outfits) return;

    let filtered = [...outfits];

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter((outfit) =>
        outfit.name.toLowerCase().includes(searchTerm)
      );
    }

    // Apply season filter
    if (filters.season !== "all") {
      filtered = filtered.filter(
        (outfit) => outfit.season.toLowerCase() === filters.season.toLowerCase()
      );
    }

    // Apply occasion filter
    if (filters.occasion !== "all") {
      filtered = filtered.filter(
        (outfit) =>
          outfit.occasion.toLowerCase() === filters.occasion.toLowerCase()
      );
    }

    setFilteredOutfits(filtered);
  }, [filters, outfits]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{minHeight: '100vh', py: 4}}>
    <Container maxWidth="xl">
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Playfair Display",
            fontStyle: "italic",
            color: "primary.main",
            mb: 4,
          }}
        >
          My Outfits
        </Typography>

        <OutfitsFilter filters={filters} onFilterChange={setFilters} />

        {filteredOutfits.length === 0 ? (
          <Box textAlign="center" py={8}>
            <Typography variant="h6" color="text.secondary">
              No outfits found
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              {outfits.length === 0
                ? "Start by creating your first outfit!"
                : "Try adjusting your filters"}
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredOutfits.map((outfit) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={outfit.outfit_id}>
                <OutfitCard
                  outfit={outfit}
                  onEdit={() => navigate(`/outfits/${outfit.outfit_id}`)}
                  onDelete={async () => {
                    try {
                      await OutfitService.deleteOutfit(outfit.outfit_id);
                      fetchOutfits();
                    } catch (err) {
                      setError("Failed to delete outfit");
                    }
                  }}
                />
              </Grid>
            ))}
          </Grid>
        )}
    </Container>
    </Box>
  );
};

export default OutfitsPage;
